import { Component, signal } from '@angular/core';
import { ProductService } from './bai-cu/product-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('my-app');
  products: any;
  constructor(ps: ProductService) {
    this.products = ps.getAllProducts();
  }
}
