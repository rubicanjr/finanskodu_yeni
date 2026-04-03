#!/usr/bin/env python3
"""
Finans Kodu - Günlük Piyasa Analizi Pipeline
=============================================
BIST ve kripto piyasaları için otomatik teknik analiz scripti.
Çıktı: output/analysis_YYYYMMDD_HHMMSS.txt
"""

import os
import sys
import json
import logging
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
import yfinance as yf
import requests

# .env dosyasını yükle (varsa)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# ============================================================================
# LOGGING AYARLARI
# ============================================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# ============================================================================
# ANALİZ EDİLECEK SEMBOLLER
# ============================================================================
BIST_TICKERS = [
    "THYAO", "GARAN", "AKBNK", "EREGL", "BIMAS",
    "KCHOL", "SAHOL", "TUPRS", "ASELS", "SISE",
    "YKBNK", "HALKB", "VAKBN", "PGSUS", "TAVHL"
]

CRYPTO_TICKERS = [
    "BTC-USD", "ETH-USD", "BNB-USD"
]

GLOBAL_TICKERS = [
    "^GSPC",   # S&P 500
    "^IXIC",   # NASDAQ
    "^XU100.IS",  # BIST 100
    "GC=F",    # Altın
    "CL=F",    # Ham Petrol
    "EURUSD=X", # EUR/USD
    "USDTRY=X", # USD/TRY
]

# ============================================================================
# YARDIMCI FONKSİYONLAR
# ============================================================================

def calculate_rsi(prices: pd.Series, period: int = 14) -> pd.Series:
    """RSI (Relative Strength Index) hesapla."""
    delta = prices.diff()
    gain = delta.where(delta > 0, 0).rolling(window=period).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
    rs = gain / loss
    return 100 - (100 / (1 + rs))


def calculate_macd(prices: pd.Series, fast: int = 12, slow: int = 26, signal: int = 9):
    """MACD hesapla. (MACD line, Signal line, Histogram) döndürür."""
    ema_fast = prices.ewm(span=fast, adjust=False).mean()
    ema_slow = prices.ewm(span=slow, adjust=False).mean()
    macd_line = ema_fast - ema_slow
    signal_line = macd_line.ewm(span=signal, adjust=False).mean()
    histogram = macd_line - signal_line
    return macd_line, signal_line, histogram


def fetch_data(ticker_yf: str, days: int = 180) -> pd.DataFrame:
    """yfinance'den fiyat verisi çek."""
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    try:
        data = yf.download(ticker_yf, start=start_date, end=end_date, progress=False, auto_adjust=True)
        # Henüz kapanmamış bugünkü satırı (NaN içeren) temizle
        data = data.dropna(how='any')
        return data
    except Exception as e:
        logger.warning(f"{ticker_yf} veri çekme hatası: {e}")
        return pd.DataFrame()


def analyze_ticker(ticker: str, is_bist: bool = True) -> dict:
    """
    Tek bir sembol için teknik analiz yap.
    Karar mekanizması: RSI + SMA + Hacim + MACD skorlaması.
    """
    ticker_yf = f"{ticker}.IS" if is_bist and not ticker.endswith(".IS") else ticker

    data = fetch_data(ticker_yf)

    if data.empty or len(data) < 50:
        return {
            "ticker": ticker,
            "status": "VERİ YOK",
            "color": "gray",
            "message": "Yeterli veri bulunamadı.",
            "reasons": [],
            "indicators": {}
        }

    # Göstergeleri hesapla
    close = data["Close"].squeeze()
    volume = data["Volume"].squeeze()

    data["RSI"] = calculate_rsi(close)
    data["SMA20"] = close.rolling(20).mean()
    data["SMA50"] = close.rolling(50).mean()
    data["Volume_MA"] = volume.rolling(20).mean()
    macd_line, signal_line, histogram = calculate_macd(close)
    data["MACD"] = macd_line
    data["MACD_Signal"] = signal_line
    data["MACD_Hist"] = histogram

    # Son değerleri al
    last = data.iloc[-1]
    prev = data.iloc[-2] if len(data) >= 2 else last

    current_price = float(close.iloc[-1])
    rsi = float(data["RSI"].iloc[-1])
    sma20 = float(data["SMA20"].iloc[-1])
    sma50 = float(data["SMA50"].iloc[-1])
    current_volume = float(volume.iloc[-1])
    avg_volume = float(data["Volume_MA"].iloc[-1])
    macd_val = float(data["MACD"].iloc[-1])
    macd_sig = float(data["MACD_Signal"].iloc[-1])
    price_change_pct = ((current_price - float(close.iloc[-2])) / float(close.iloc[-2])) * 100 if len(data) >= 2 else 0.0

    # Skor mekanizması
    score = 0
    reasons = []

    # 1. Fiyat vs SMA50
    if current_price > sma50:
        score += 1
        reasons.append(f"✅ Fiyat SMA50 üzerinde ({current_price:.2f} > {sma50:.2f}) — Yükseliş Trendi")
    else:
        score -= 1
        reasons.append(f"❌ Fiyat SMA50 altında ({current_price:.2f} < {sma50:.2f}) — Düşüş Trendi")

    # 2. Fiyat vs SMA20
    if current_price > sma20:
        score += 1
        reasons.append(f"✅ Fiyat SMA20 üzerinde ({current_price:.2f} > {sma20:.2f}) — Kısa Vadeli Güç")
    else:
        score -= 1
        reasons.append(f"❌ Fiyat SMA20 altında ({current_price:.2f} < {sma20:.2f}) — Kısa Vadeli Zayıflık")

    # 3. RSI
    if rsi >= 55:
        score += 1
        reasons.append(f"✅ RSI güçlü: {rsi:.1f} — Momentum Pozitif")
    elif rsi <= 45:
        score -= 1
        reasons.append(f"❌ RSI zayıf: {rsi:.1f} — Momentum Negatif")
    else:
        reasons.append(f"⚠️ RSI nötr: {rsi:.1f} — Kararsız Bölge")

    # RSI aşırı alım/satım uyarısı
    if rsi >= 70:
        reasons.append(f"⚠️ RSI aşırı alım bölgesinde ({rsi:.1f}) — Düzeltme Riski")
    elif rsi <= 30:
        reasons.append(f"⚠️ RSI aşırı satım bölgesinde ({rsi:.1f}) — Toparlanma Fırsatı")

    # 4. Hacim
    if current_volume >= avg_volume * 1.2:
        score += 1
        reasons.append(f"✅ Hacim ortalamanın üzerinde ({current_volume:,.0f} > {avg_volume:,.0f}) — Güçlü İlgi")
    elif current_volume < avg_volume * 0.8:
        score -= 1
        reasons.append(f"❌ Hacim ortalamanın altında ({current_volume:,.0f} < {avg_volume:,.0f}) — Zayıf İlgi")
    else:
        reasons.append(f"⚠️ Hacim normal seviyelerde ({current_volume:,.0f} ≈ {avg_volume:,.0f})")

    # 5. MACD
    if macd_val > macd_sig:
        score += 1
        reasons.append(f"✅ MACD sinyal üzerinde ({macd_val:.3f} > {macd_sig:.3f}) — Alım Sinyali")
    else:
        score -= 1
        reasons.append(f"❌ MACD sinyal altında ({macd_val:.3f} < {macd_sig:.3f}) — Satış Sinyali")

    # Karar
    if score >= 3:
        status = "POZİTİF"
        color = "green"
        message = "Güçlü Alım İştahı ve Pozitif Trend. Yükseliş Beklentisi."
    elif score <= -2:
        status = "NEGATİF"
        color = "red"
        message = "Trend Düşüşte ve Hacim Zayıf. Satış Baskısı Hissediliyor."
    else:
        status = "NÖTR/KARIŞIK"
        color = "yellow"
        message = "Karışık Sinyaller. Dikkatli İzleme Önerilir."

    return {
        "ticker": ticker,
        "status": status,
        "color": color,
        "message": message,
        "reasons": reasons,
        "score": score,
        "indicators": {
            "current_price": round(current_price, 4),
            "price_change_pct": round(price_change_pct, 2),
            "rsi": round(rsi, 2),
            "sma20": round(sma20, 4),
            "sma50": round(sma50, 4),
            "volume": int(current_volume),
            "avg_volume": int(avg_volume),
            "macd": round(macd_val, 4),
            "macd_signal": round(macd_sig, 4),
        }
    }


# ============================================================================
# RAPOR OLUŞTURMA
# ============================================================================

def build_report(results: list, run_time: datetime) -> str:
    """Analiz sonuçlarından metin raporu oluştur."""
    lines = []
    sep = "=" * 72

    lines.append(sep)
    lines.append("  FİNANS KODU — GÜNLÜK PİYASA ANALİZİ RAPORU")
    lines.append(f"  Tarih/Saat: {run_time.strftime('%d.%m.%Y %H:%M:%S')}")
    lines.append(sep)
    lines.append("")

    # Özet istatistikler
    positive = [r for r in results if r["status"] == "POZİTİF"]
    negative = [r for r in results if r["status"] == "NEGATİF"]
    neutral  = [r for r in results if r["status"] == "NÖTR/KARIŞIK"]
    errors   = [r for r in results if r["status"] in ("VERİ YOK", "HATA")]

    lines.append("ÖZET")
    lines.append("-" * 40)
    lines.append(f"  Toplam Analiz  : {len(results)}")
    lines.append(f"  ✅ Pozitif      : {len(positive)}")
    lines.append(f"  ❌ Negatif      : {len(negative)}")
    lines.append(f"  ⚠️  Nötr/Karışık : {len(neutral)}")
    lines.append(f"  ⛔ Veri Yok/Hata: {len(errors)}")
    lines.append("")

    # Kategorilere göre detay
    categories = [
        ("BIST HİSSELERİ", [r for r in results if not r["ticker"].startswith("^") and "-USD" not in r["ticker"] and "=X" not in r["ticker"] and "=F" not in r["ticker"]]),
        ("KRİPTO PARALAR", [r for r in results if "-USD" in r["ticker"]]),
        ("GLOBAL GÖSTERGELER", [r for r in results if r["ticker"].startswith("^") or "=X" in r["ticker"] or "=F" in r["ticker"]]),
    ]

    for cat_name, cat_results in categories:
        if not cat_results:
            continue
        lines.append(sep)
        lines.append(f"  {cat_name}")
        lines.append(sep)
        for r in cat_results:
            ind = r.get("indicators", {})
            price = ind.get("current_price", "N/A")
            change = ind.get("price_change_pct", 0)
            rsi = ind.get("rsi", "N/A")
            score = r.get("score", "N/A")
            change_str = f"+{change:.2f}%" if isinstance(change, float) and change >= 0 else f"{change:.2f}%"

            lines.append(f"\n  [{r['status']}] {r['ticker']}")
            lines.append(f"  Fiyat: {price}  Günlük Değişim: {change_str}  RSI: {rsi}  Skor: {score}/5")
            lines.append(f"  Mesaj: {r['message']}")
            lines.append("  Nedenler:")
            for reason in r.get("reasons", []):
                lines.append(f"    {reason}")
        lines.append("")

    lines.append(sep)
    lines.append("  RAPOR SONU")
    lines.append(sep)

    return "\n".join(lines)


# ============================================================================
# ANA PIPELINE
# ============================================================================

def run_pipeline():
    """Günlük piyasa analizi pipeline'ını çalıştır."""
    run_time = datetime.now()
    logger.info("=" * 60)
    logger.info("Finans Kodu Günlük Analiz Pipeline'ı Başlatıldı")
    logger.info(f"Zaman: {run_time.strftime('%d.%m.%Y %H:%M:%S')}")
    logger.info("=" * 60)

    all_results = []

    # BIST Hisseleri
    logger.info(f"\n[1/3] BIST hisseleri analiz ediliyor ({len(BIST_TICKERS)} sembol)...")
    for ticker in BIST_TICKERS:
        logger.info(f"  -> {ticker}.IS analiz ediliyor...")
        try:
            result = analyze_ticker(ticker, is_bist=True)
            all_results.append(result)
            logger.info(f"     Sonuç: {result['status']} (Skor: {result.get('score', 'N/A')})")
        except Exception as e:
            logger.error(f"  HATA [{ticker}]: {e}")
            all_results.append({"ticker": ticker, "status": "HATA", "color": "gray", "message": str(e), "reasons": [], "indicators": {}})

    # Kripto
    logger.info(f"\n[2/3] Kripto paralar analiz ediliyor ({len(CRYPTO_TICKERS)} sembol)...")
    for ticker in CRYPTO_TICKERS:
        logger.info(f"  -> {ticker} analiz ediliyor...")
        try:
            result = analyze_ticker(ticker, is_bist=False)
            all_results.append(result)
            logger.info(f"     Sonuç: {result['status']} (Skor: {result.get('score', 'N/A')})")
        except Exception as e:
            logger.error(f"  HATA [{ticker}]: {e}")
            all_results.append({"ticker": ticker, "status": "HATA", "color": "gray", "message": str(e), "reasons": [], "indicators": {}})

    # Global Göstergeler
    logger.info(f"\n[3/3] Global göstergeler analiz ediliyor ({len(GLOBAL_TICKERS)} sembol)...")
    for ticker in GLOBAL_TICKERS:
        logger.info(f"  -> {ticker} analiz ediliyor...")
        try:
            result = analyze_ticker(ticker, is_bist=False)
            all_results.append(result)
            logger.info(f"     Sonuç: {result['status']} (Skor: {result.get('score', 'N/A')})")
        except Exception as e:
            logger.error(f"  HATA [{ticker}]: {e}")
            all_results.append({"ticker": ticker, "status": "HATA", "color": "gray", "message": str(e), "reasons": [], "indicators": {}})

    # Rapor oluştur
    logger.info("\nRapor oluşturuluyor...")
    report_text = build_report(all_results, run_time)

    # Çıktı dosyasına kaydet
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
    os.makedirs(output_dir, exist_ok=True)
    filename = f"analysis_{run_time.strftime('%Y%m%d_%H%M%S')}.txt"
    output_path = os.path.join(output_dir, filename)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(report_text)

    # JSON çıktısı da kaydet
    json_filename = f"analysis_{run_time.strftime('%Y%m%d_%H%M%S')}.json"
    json_path = os.path.join(output_dir, json_filename)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({
            "run_time": run_time.isoformat(),
            "results": all_results
        }, f, ensure_ascii=False, indent=2)

    logger.info(f"\n✅ Analiz tamamlandı!")
    logger.info(f"   TXT Rapor : {output_path}")
    logger.info(f"   JSON Veri : {json_path}")
    logger.info("=" * 60)

    # Raporu stdout'a da yaz
    print("\n" + report_text)

    return output_path, all_results


if __name__ == "__main__":
    run_pipeline()
