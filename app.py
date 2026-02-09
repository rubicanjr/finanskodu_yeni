from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import os
from datetime import datetime, timedelta
import numpy as np

app = Flask(__name__)
# CORS konfigürasyonu: React frontend'den (localhost:3000) gelen isteklere izin ver
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})
# Alternatif: Tüm origins'ten gelen isteklere izin ver (development için)
# CORS(app)

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def calculate_rsi(prices, period=14):
    """
    RSI (Relative Strength Index) hesapla
    """
    delta = prices.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

# ============================================================================
# PHASE 2: DATA ENGINE & ALGORITHM
# ============================================================================

def analyze_technical(ticker):
    """
    Teknik analiz motorunun ana fonksiyonu.
    
    Parametreler:
    - ticker: Hisse kodu (örn: THYAO, EREGL)
    
    Çıktı:
    - JSON formatında durum, renk, mesaj ve detaylı göstergeler
    """
    try:
        # Veri çekme: Son 6 aylık veri
        end_date = datetime.now()
        start_date = end_date - timedelta(days=180)
        
        # BIST hisseleri için .IS suffix'i ekle
        if not ticker.endswith('.IS') and not ticker.endswith('USDT'):
            ticker_yf = f"{ticker}.IS"
        else:
            ticker_yf = ticker
        
        # yfinance'den veri çek
        data = yf.download(ticker_yf, start=start_date, end=end_date, progress=False)
        
        if data.empty:
            return {
                "status": "ERROR",
                "message": f"{ticker} için veri bulunamadı.",
                "color": "gray"
            }
        
        # Göstergeler hesapla (Manuel)
        data['RSI'] = calculate_rsi(data['Close'], period=14)
        data['SMA20'] = data['Close'].rolling(window=20).mean()
        data['SMA50'] = data['Close'].rolling(window=50).mean()
        data['Volume_MA'] = data['Volume'].rolling(window=20).mean()
        
        # Son değerleri al
        current_price = data['Close'].iloc[-1]
        rsi = data['RSI'].iloc[-1]
        sma20 = data['SMA20'].iloc[-1]
        sma50 = data['SMA50'].iloc[-1]
        current_volume = data['Volume'].iloc[-1]
        avg_volume = data['Volume_MA'].iloc[-1]
        
        # KARAR MEKANİZMASI (Decision Tree)
        # Trend Puanı (0-3): Her "EVET" cevabı -1, "HAYIR" +1
        score = 0
        reasons = []
        
        # Soru 1: Fiyat < SMA50 mi? (Trend Düşüşte mi?)
        if current_price < sma50:
            score -= 1  # EVET: Trend düşüşte
            reasons.append("❌ Fiyat SMA50'nin altında (Düşüş Trendi)")
        else:
            score += 1  # HAYIR: Trend yükselişte
            reasons.append("✅ Fiyat SMA50'nin üzerinde (Yükseliş Trendi)")
        
        # Soru 2: RSI < 45 mi? (Momentum Düşük mü?)
        if rsi < 45:
            score -= 1  # EVET: Momentum düşük
            reasons.append("❌ RSI 45'in altında (Zayıf Momentum)")
        else:
            score += 1  # HAYIR: Momentum güçlü
            reasons.append("✅ RSI 45'in üzerinde (Güçlü Momentum)")
        
        # Soru 3: Son gün hacmi < Ortalama Hacim mi? (İlgisizlik var mı?)
        if current_volume < avg_volume:
            score -= 1  # EVET: İlgisizlik var
            reasons.append("❌ Hacim ortalamanın altında (Zayıf İlgi)")
        else:
            score += 1  # HAYIR: İlgi güçlü
            reasons.append("✅ Hacim ortalamanın üzerinde (Güçlü İlgi)")
        
        # Uyumsuzluk kontrolü (Basitleştirilmiş)
        divergence_warning = ""
        if len(data) > 5:
            # Son 5 gün içinde fiyat yeni tepe yaptı mı?
            recent_high = data['Close'].iloc[-5:].max()
            recent_rsi_high = data['RSI'].iloc[-5:].max()
            
            if current_price >= recent_high * 0.99 and rsi < 70:
                divergence_warning = "⚠️ Negatif Uyumsuzluk: Fiyat yeni tepe yaparken RSI yükselenmiyor"
                reasons.append(divergence_warning)
        
        # SONUÇ ÇIKTISI
        if score <= 1:
            status = "NEGATİF"
            color = "red"
            message = "Trend Düşüşte ve Hacim Zayıf. Satış Baskısı Hissediliyor."
        elif score >= 2:
            status = "POZİTİF"
            color = "green"
            message = "Güçlü Alım İştahı ve Pozitif Trend. Yükseliş Beklentisi."
        else:
            status = "NÖTR/KARIŞIK"
            color = "yellow"
            message = "Karışık Sinyaller. Dikkatli İzleme Önerilir."
        
        return {
            "status": status,
            "color": color,
            "message": message,
            "reasons": reasons,
            "indicators": {
                "current_price": round(current_price, 2),
                "rsi": round(rsi, 2),
                "sma20": round(sma20, 2),
                "sma50": round(sma50, 2),
                "volume": int(current_volume),
                "avg_volume": int(avg_volume)
            },
            "score": score,
            "divergence_warning": divergence_warning
        }
    
    except Exception as e:
        return {
            "status": "ERROR",
            "message": f"Analiz sırasında hata oluştu: {str(e)}",
            "color": "gray"
        }

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.route('/api/analyze', methods=['POST'])
def analyze():
    """
    Teknik analiz endpoint'i.
    POST body: {"ticker": "THYAO"}
    """
    try:
        data = request.get_json()
        ticker = data.get('ticker', '').upper()
        
        if not ticker:
            return jsonify({"error": "Ticker gereklidir"}), 400
        
        result = analyze_technical(ticker)
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Sağlık kontrolü endpoint'i"""
    return jsonify({"status": "ok", "message": "Flask backend çalışıyor"}), 200

# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
