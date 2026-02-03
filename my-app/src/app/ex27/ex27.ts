import { Component } from '@angular/core';
import { IFakeProduct } from '../classes/fake-product';
import { FakeProductService } from '../ex26/fake-product-service';

@Component({
  selector: 'app-ex27',
  standalone: false,
  templateUrl: './ex27.html',
  styleUrl: './ex27.css',
})
export class Ex27 {
  data: IFakeProduct[] = [];
  errMessage: string = '';

  constructor(_service: FakeProductService) {
    _service.getFakeProductData().subscribe({
      next: (data: IFakeProduct[]) => {
        this.data = data;
      },
      error: (err: any) => {
        this.errMessage = err?.message ?? String(err);
      },
    });
  }
}
