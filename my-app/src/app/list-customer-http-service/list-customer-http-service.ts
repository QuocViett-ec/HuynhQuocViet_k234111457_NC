import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../my-service/customer-service';

@Component({
  selector: 'app-list-customer-http-service',
  standalone: false,
  templateUrl: './list-customer-http-service.html',
  styleUrl: './list-customer-http-service.css',
})
export class ListCustomerHttpService implements OnInit {
  customers: any[] = [];

  constructor(private cs: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.cs.getCustomersFromJson().subscribe({
      next: (data) => {
        this.customers = data;
        console.log('Loaded customers from JSON:', data);
      },
      error: (err) => {
        console.error('Error loading customers:', err);
      },
    });
  }

  view_detail(id: any) {
    this.router.navigate(['/list-customers-http-service', id]);
  }
}
