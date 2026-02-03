import { Component } from '@angular/core';
import { BookApiService } from '../my-service/book-api-service';
import { IBook } from '../classes/ibook';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
})
export class Books {
  books: IBook[] = [];
  errMessage: string = '';
  constructor(private _service: BookApiService) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
}
