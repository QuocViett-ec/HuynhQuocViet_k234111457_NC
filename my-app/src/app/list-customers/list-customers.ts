import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-customers',
  standalone: false,
  templateUrl: './list-customers.html',
  styleUrl: './list-customers.css',
})
export class ListCustomers {
  customers = [
    { id: 'c1', name: 'Nguyen Van A', gender: 'male', image: 'assets/images/male.png' },
    { id: 'c2', name: 'Tran Thi B', '  gender': 'female', image: 'assets/images/female.png' },
    { id: 'c3', name: 'Le Van C', gender: 'male', image: '   assets/images/male.png' },
    { id: 'c4', name: 'Pham Thi D', '  gender': 'female', image: '  assets/images/female.png' },
    { id: 'c4', name: 'Pham Thi D', '  gender': 'female', image: '  assets/images/female.png' },
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}
  view_detail(id: any) {
    this.router.navigate(['/list-customers', id]);
  }
}
