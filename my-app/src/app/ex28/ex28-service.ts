import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface for BPI currency data
export interface BpiCurrency {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

// Interface for time data
export interface TimeData {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

// Main interface for Bitcoin Price Index data
export interface BpiData {
  time: TimeData;
  disclaimer: string;
  chartName: string;
  bpi: Record<string, BpiCurrency>;
}

@Injectable({
  providedIn: 'root',
})
export class Ex28Service {
  private readonly API_URL = '/v1/bpi/currentprice.json';

  constructor(private http: HttpClient) {}

  /**
   * Get current Bitcoin Price Index from CoinDesk API
   * @returns Observable with BPI data
   */
  getBitcoinPrice(): Observable<BpiData> {
    return this.http.get<BpiData>(this.API_URL);
  }
}
