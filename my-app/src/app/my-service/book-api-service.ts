import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IBook } from '../classes/ibook';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private _http: HttpClient) {}
  
  getBooks(): Observable<IBook[]> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("/books", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IBook>),
      retry(3),
      catchError(this.handleError)
    );
  }
  
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
