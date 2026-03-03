import { Component, signal } from '@angular/core';
import { ProductService } from './bai-cu/product-service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('my-app');
  products: any;
  isLoginPage: boolean = true;

  constructor(
    ps: ProductService,
    private _router: Router,
  ) {
    this.products = ps.getAllProducts();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/loggin';
      }
    });
  }
}
