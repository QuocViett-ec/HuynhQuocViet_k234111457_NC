import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iBookEx50 } from '../ex50-class/ibook-ex50';

@Injectable({
  providedIn: 'root',
})
export class Ex50Bookservice {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  // GET all books
  getAllBooks(): Observable<iBookEx50[]> {
    return this.http.get<iBookEx50[]>(this.apiUrl);
  }

  // GET book by ID
  getBookById(id: string): Observable<iBookEx50> {
    return this.http.get<iBookEx50>(`${this.apiUrl}/${id}`);
  }

  // POST create new book
  createBook(book: iBookEx50): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  // PUT update book
  updateBook(id: string, book: iBookEx50): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  // DELETE book
  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
