import { Component } from '@angular/core';
import { ProductHttpService } from '../bai-cu/product-http-service';
import { IProduct } from '../classes/iproduct';

@Component({
  selector: 'app-list-product-3',
  standalone: false,
  templateUrl: './list-product-3.html',
  styleUrls: ['./list-product-3.css'],
})
export class ListProduct3 {
  products: IProduct[] = [];
  constructor(private pshttp: ProductHttpService) {
    this.pshttp.get_all_products().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
      },
    });
  }
}
