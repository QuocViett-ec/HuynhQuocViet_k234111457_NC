import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookAPIService } from '../my-service/book-api-service';
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

  constructor(
    private _service: BookAPIService,
    private router: Router,
  ) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  viewDetail(bookId: string) {
    this.router.navigate(['/ex41', bookId]);
  }
}
