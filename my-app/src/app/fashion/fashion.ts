import { Component } from '@angular/core';
import { FashionApiService } from '../my-service/fashion-api-service';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion {
  fashions: any;
  errMessage: string = '';
  constructor(public _service: FashionApiService) {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
}
