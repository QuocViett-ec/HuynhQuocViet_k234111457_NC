import { Component } from '@angular/core';
import { ProductServiceEx13, ProductImage } from '../product-service-ex13';

@Component({
  selector: 'app-service-product-image-event',
  standalone: false,
  templateUrl: './service-product-image-event.html',
  styleUrls: ['./service-product-image-event.css'],
})
export class ServiceProductImageEvent {
  public products: ProductImage[];
  public selectedProduct: ProductImage | null = null;

  constructor(pservice: ProductServiceEx13) {
    this.products = pservice.getProductsWithImages();
  }

  viewDetail(p: ProductImage) {
    this.selectedProduct = p;
  }

  goBack() {
    this.selectedProduct = null;
  }
}
