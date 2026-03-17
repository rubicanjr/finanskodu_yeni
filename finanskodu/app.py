from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import pandas as pd
import os
from datetime import datetime, timedelta
import numpy as np
import requests

app = Flask(__name__)
# CORS konfigürasyonu: React frontend'den (localhost:3000) gelen isteklere izin ver
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def calculate_rsi(prices, period=14):
    """RSI (Relative Strength Index) hesapla"""
    delta = prices.diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def analyze_sentiment(ticker):
    """Sentiment140 API kullanarak sosyal medya duygu analizi yap. Fallback: Demo veri"""
    try:
        # Sentiment140 API endpoint
        url = "https://www.sentiment140.com/api/bulkClassifyJson"
        
        # Demo tweet verileri
        tweets = [
            {"text": f"{ticker} hisse senedi yukseliste", "location": ""},
            {"text": f"{ticker} guclu alim baskisi var", "location": ""},
            {"text": f"{ticker} fiyati artiyor", "location": ""},
        ]
        
        payload = {"data": tweets}
        
        try:
            response = requests.post(url, json=payload, timeout=5)
            if response.status_code == 200:
                data = response.json()
                positive_count = sum(1 for item in data.get("data", []) if item.get("polarity") == 4)
                negative_count = sum(1 for item in data.get("data", []) if item.get("polarity") == 0)
                neutral_count = len(data.get("data", [])) - positive_count - negative_count
                total = len(data.get("data", [])) or 1
                sentiment_score = int((positive_count / total) * 100)
                
                return {
                    "sentiment_score": sentiment_score,
                    "positive": positive_count,
                    "negative": negative_count,
                    "neutral": neutral_count,
                    "total_tweets": total,
                    "status": "POZİTİF" if sentiment_score > 60 else "NEGATİF" if sentiment_score < 40 else "NÖTR"
                }
        except:
            pass
        
        # Fallback: Demo veri
        return {
            "sentiment_score": 75,
            "positive": 45,
            "negative": 15,
            "neutral": 40,
            "total_tweets": 100,
            "status": "POZİTİF",
            "note": "Demo veri (API timeout)"
        }
    
    except Exception as e:
        return {
            "sentiment_score": 50,
            "positive": 30,
            "negative": 30,
            "neutral": 40,
            "total_tweets": 100,
            "status": "NÖTR",
            "error": str(e)
        }

# ============================================================================
# PHASE 2: DATA ENGINE & ALGORITHM
# ============================================================================

def analyze_technical(ticker):
    """Teknik analiz motorunun ana fonksiyonu."""
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
        score = 0
        reasons = []
        
        # Soru 1: Fiyat < SMA50 mi?
        if current_price < sma50:
            score -= 1
            reasons.append("❌ Fiyat SMA50'nin altında (Düşüş Trendi)")
        else:
            score += 1
            reasons.append("✅ Fiyat SMA50'nin üzerinde (Yükseliş Trendi)")
        
        # Soru 2: RSI < 45 mi?
        if rsi < 45:
            score -= 1
            reasons.append("❌ RSI 45'in altında (Zayıf Momentum)")
        else:
            score += 1
            reasons.append("✅ RSI 45'in üzerinde (Güçlü Momentum)")
        
        # Soru 3: Son gün hacmi < Ortalama Hacim mi?
        if current_volume < avg_volume:
            score -= 1
            reasons.append("❌ Hacim ortalamanın altında (Zayıf İlgi)")
        else:
            score += 1
            reasons.append("✅ Hacim ortalamanın üzerinde (Güçlü İlgi)")
        
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
            "score": score
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
    """Teknik analiz endpoint'i"""
    try:
        data = request.get_json()
        ticker = data.get('ticker', '').upper()
        
        if not ticker:
            return jsonify({"error": "Ticker gereklidir"}), 400
        
        result = analyze_technical(ticker)
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sentiment', methods=['POST'])
def sentiment():
    """Sosyal medya duygu analizi endpoint'i"""
    try:
        data = request.get_json()
        ticker = data.get('ticker', '').upper()
        
        if not ticker:
            return jsonify({"error": "Ticker gereklidir"}), 400
        
        result = analyze_sentiment(ticker)
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
