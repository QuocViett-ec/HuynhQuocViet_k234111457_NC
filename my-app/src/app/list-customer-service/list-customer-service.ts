import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CustomerService } from '../my-service/customer-service';

@Component({
  selector: 'app-list-customer-service',
  standalone: false,
  templateUrl: './list-customer-service.html',
  styleUrl: './list-customer-service.css',
})
export class ListCustomerService {
  customers: any[] = [];

  constructor(private cs: CustomerService, private router: Router) {
    this.customers = cs.getAllCustomers();
  }

  view_detail(id: any) {
    this.router.navigate(['list-customer-service', id]);
  }
}
