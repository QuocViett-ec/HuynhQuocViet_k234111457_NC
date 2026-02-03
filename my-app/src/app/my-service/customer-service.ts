import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers = [];

  private jsonUrl = 'assets/dataset/customer-list.json';

  constructor(private http: HttpClient) {}

  public getAllCustomers() {
    return this.customers;
  }

  public getCustomersFromJson(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }
}
