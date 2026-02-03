import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ex28Service, BpiData } from './ex28-service';
import { EMPTY, Subject, timer } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ex28',
  standalone: false,
  templateUrl: './ex28.html',
  styleUrl: './ex28.css',
})
export class Ex28 implements OnInit {
  bitcoinData: BpiData | null = null;
  loading: boolean = false;
  error: string | null = null;
  lastUpdated: Date | null = null;

  autoRefresh = true;
  refreshIntervalMs = 10_000;
  refreshing = false;

  private readonly destroy$ = new Subject<void>();
  private readonly refreshRestart$ = new Subject<void>();

  constructor(private ex28Service: Ex28Service) {}

  ngOnInit(): void {
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.refreshRestart$.next();
    this.refreshRestart$.complete();
  }

  /**
   * Load Bitcoin Price Index from CoinDesk API
   */
  loadBitcoinPrice(): void {
    const isInitialLoad = !this.bitcoinData;

    if (isInitialLoad) {
      this.loading = true;
    } else {
      this.refreshing = true;
    }

    this.error = null;

    this.ex28Service
      .getBitcoinPrice()
      .pipe(
        tap((data) => {
          this.bitcoinData = data;
          this.lastUpdated = new Date();
        }),
        catchError((err) => {
          this.error = 'Failed to load Bitcoin Price Index. Please try again.';
          return EMPTY;
        }),
        tap(() => {
          this.loading = false;
          this.refreshing = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  startAutoRefresh(): void {
    this.refreshRestart$
      .pipe(
        switchMap(() =>
          this.autoRefresh
            ? timer(0, this.refreshIntervalMs).pipe(
                switchMap(() =>
                  this.ex28Service.getBitcoinPrice().pipe(
                    tap((data) => {
                      this.bitcoinData = data;
                      this.lastUpdated = new Date();
                      this.loading = false;
                      this.refreshing = false;
                      this.error = null;
                    }),
                    catchError(() => {
                      this.loading = false;
                      this.refreshing = false;
                      this.error = 'Failed to load Bitcoin Price Index. Please try again.';
                      return EMPTY;
                    }),
                  ),
                ),
                takeUntil(this.destroy$),
              )
            : EMPTY,
        ),
      )
      .subscribe();

    this.loading = !this.bitcoinData;
    this.refreshRestart$.next();
  }

  stopAutoRefresh(): void {
    this.autoRefresh = false;
    this.refreshRestart$.next();
  }

  onAutoRefreshToggle(enabled: boolean): void {
    this.autoRefresh = enabled;
    if (enabled) {
      this.loading = !this.bitcoinData;
      this.refreshRestart$.next();
    } else {
      this.refreshRestart$.next();
    }
  }

  onIntervalChange(valueMs: number): void {
    this.refreshIntervalMs = valueMs;
    if (this.autoRefresh) {
      this.refreshing = !!this.bitcoinData;
      this.refreshRestart$.next();
    }
  }

  /**
   * Refresh Bitcoin price data
   */
  refresh(): void {
    this.loadBitcoinPrice();
  }

  /**
   * Get array of currency codes for iteration
   */
  getCurrencies(): string[] {
    return this.bitcoinData ? Object.keys(this.bitcoinData.bpi) : [];
  }
}
