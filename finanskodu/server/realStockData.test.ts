/**
 * Tests for Real Stock Data Fetcher & Technical Analysis Calculator
 */

import { describe, it, expect } from "vitest";
import { getRealStockData } from "./_core/realStockData";

describe("Real Stock Data Integration", () => {
  it("should fetch real data for THYAO (Turkish Airlines)", async () => {
    const data = await getRealStockData("THYAO");
    
    // Check that data is returned
    expect(data).toBeDefined();
    expect(data.price).toBeGreaterThan(0);
    
    // Check technical indicators
    expect(data.rsi).toBeDefined();
    expect(data.ma50).toBeDefined();
    expect(data.teknik_durum).toMatch(/POZİTİF|NEGATİF|NÖTR|KARIŞIK/);
    
    // Check fundamental data
    expect(data.fk).toBeDefined();
    expect(data.pddd).toBeDefined();
    
    console.log("THYAO Real Data:", data);
  }, 30000); // 30 second timeout for API calls

  it("should fetch real data for ASELS (Aselsan)", async () => {
    const data = await getRealStockData("ASELS");
    
    expect(data).toBeDefined();
    expect(data.price).toBeGreaterThan(0);
    expect(data.teknik_durum).toMatch(/POZİTİF|NEGATİF|NÖTR|KARIŞIK/);
    
    console.log("ASELS Real Data:", data);
  }, 30000);

  it("should handle invalid ticker gracefully", async () => {
    const data = await getRealStockData("INVALID_TICKER_XYZ");
    
    // Should return fallback data instead of throwing
    expect(data).toBeDefined();
    expect(data.price).toBe(0);
    expect(data.rsi).toBe("Veri Yok");
    expect(data.ma50).toBe("Veri Yok");
    expect(data.teknik_durum).toBe("NÖTR");
  }, 30000);

  it("should calculate RSI correctly", async () => {
    const data = await getRealStockData("THYAO");
    
    if (typeof data.rsi === 'number') {
      // RSI should be between 0 and 100
      expect(data.rsi).toBeGreaterThanOrEqual(0);
      expect(data.rsi).toBeLessThanOrEqual(100);
    } else {
      // If not a number, should be "Veri Yok"
      expect(data.rsi).toBe("Veri Yok");
    }
  }, 30000);

  it("should calculate MA50 correctly", async () => {
    const data = await getRealStockData("ASELS");
    
    if (typeof data.ma50 === 'number') {
      // MA50 should be a positive number
      expect(data.ma50).toBeGreaterThan(0);
    } else {
      // If not a number, should be "Veri Yok"
      expect(data.ma50).toBe("Veri Yok");
    }
  }, 30000);

  it("should determine technical signal based on RSI and MA50", async () => {
    const data = await getRealStockData("THYAO");
    
    // Technical signal should be one of the valid values
    expect(["POZİTİF", "NEGATİF", "NÖTR", "KARIŞIK"]).toContain(data.teknik_durum);
    
    // If RSI and MA50 are available, signal should be calculated
    if (typeof data.rsi === 'number' && typeof data.ma50 === 'number') {
      if (data.rsi < 45 && data.price > data.ma50) {
        expect(data.teknik_durum).toBe("NEGATİF");
      } else if (data.rsi > 55 && data.price > data.ma50) {
        expect(data.teknik_durum).toBe("POZİTİF");
      }
    }
  }, 30000);
});
