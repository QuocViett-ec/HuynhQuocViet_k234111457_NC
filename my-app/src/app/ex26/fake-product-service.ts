import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IFakeProduct } from '../classes/fake-product';

@Injectable({
  providedIn: 'root',
})
export class FakeProductService {
  private _url: string = '/products';

  constructor(private _http: HttpClient) {}

  getFakeProductData(): Observable<IFakeProduct[]> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');

    return this._http
      .get(this._url, {
        headers,
        responseType: 'text' as const,
      })
      .pipe(
        map((res) => JSON.parse(res) as Array<IFakeProduct>),
        retry(3),
        catchError(this.handleError),
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
