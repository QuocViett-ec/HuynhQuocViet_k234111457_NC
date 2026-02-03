import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustSer {
  customers = [
    { id: 'c1', name: 'Nguyen Van A', gender: 'male', image: 'assets/images/male.png' },
    { id: 'c2', name: 'Tran Thi B', '  gender': 'female', image: 'assets/images/female.png' },
    { id: 'c3', name: 'Le Van C', gender: 'male', image: '   assets/images/male.png' },
    { id: 'c4', name: 'Pham Thi D', '  gender': 'female', image: '  assets/images/female.png' },
    { id: 'c4', name: 'Pham Thi D', '  gender': 'female', image: '  assets/images/female.png' },
  ];

  constructor() {}

  public getAllCustomers() {
    return this.customers;
  }
}
