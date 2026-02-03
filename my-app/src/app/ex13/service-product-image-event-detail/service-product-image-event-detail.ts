import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceEx13, ProductImage } from '../product-service-ex13';

@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: false,
  templateUrl: './service-product-image-event-detail.html',
  styleUrl: './service-product-image-event-detail.css',
})
export class ServiceProductImageEventDetail {
  selectedProduct: ProductImage | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private _fs: ProductServiceEx13,
    private router: Router,
  ) {
    activateRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      if (id != null) {
        this.selectedProduct = _fs.getProductDetail(id);
      }
    });
  }

  goBack() {
    this.router.navigate(['service-product-image-event']);
  }
}
