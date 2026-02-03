import { Component } from '@angular/core';
import { CustomerService } from '../bai-cu/customer-service';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrls: ['./customer.css'],
})
export class Customer {
  products: any;
  constructor(ps: CustomerService) {
    this.products = ps.getAllProducts();
  }
}
