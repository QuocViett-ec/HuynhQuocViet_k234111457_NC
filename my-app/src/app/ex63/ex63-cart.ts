import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartResponse, CheckoutForm } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class Ex63CartService {
  private apiUrl = '/ex63';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/cart`);
  }

  addToCart(productId: string, quantity: number = 1): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/cart/add`, { productId, quantity });
  }

  updateQuantity(productId: string, quantity: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(`${this.apiUrl}/cart/update`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/cart/remove/${productId}`);
  }

  clearCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/cart/clear`);
  }

  checkout(form: CheckoutForm): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cart/checkout`, form);
  }
}
