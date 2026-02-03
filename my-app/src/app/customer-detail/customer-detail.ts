import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.css',
})
export class CustomerDetail implements OnInit {
  customers = [
    { id: 'c1', name: 'Nguyen Van A', gender: 'male', image: 'assets/images/male.png' },
    { id: 'c2', name: 'Tran Thi B', gender: 'female', image: 'assets/images/female.png' },
    { id: 'c3', name: 'Le Van C', gender: 'male', image: 'assets/images/male.png' },
    { id: 'c4', name: 'Pham Thi D', gender: 'female', image: 'assets/images/female.png' },
    { id: 'c5', name: 'Hoang Van E', gender: 'male', image: 'assets/images/male.png' },
  ];
  selectedCustomer: any;
  selectedId: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.selectedId = id;
        this.selectedCustomer = this.customers.find((c) => c.id === id);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/list-customers']);
  }
}
