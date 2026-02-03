import { Component } from '@angular/core';
import { IFakeProduct } from '../classes/fake-product';
import { FakeProductService } from './fake-product-service';

@Component({
  selector: 'app-ex26',
  standalone: false,
  templateUrl: './ex26.html',
  styleUrls: ['./ex26.css'],
})
export class Ex26 {
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
