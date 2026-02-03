import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}
  products = [
    { id: 'p1', name: 'coca', price: 12000 },
    { id: 'p2', name: 'pepsi', price: 15000 },
    { id: 'p3', name: 'sting',  price: 18000 },
    { id: 'p4', name: 'aqua',  price: 6000 },
    { id: 'p5', name: 'lavie',  price: 5000 },
    { id: 'p6', name: 'fanta',  price: 14000 },
  ];
  getAllProducts() {
    return this.products;
}
}
