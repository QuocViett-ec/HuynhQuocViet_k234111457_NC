import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAPIService } from '../my-service/book-api-service';
import { IBook } from '../classes/ibook';

@Component({
  selector: 'app-bookdetail',
  standalone: false,
  templateUrl: './bookdetail.html',
  styleUrl: './bookdetail.css',
})
export class Bookdetail implements OnInit {
  book: IBook | null = null;
  bookId: string = '';
  errMessage: string = '';

  constructor(
    private _service: BookAPIService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Lấy id từ route parameter
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.bookId = id;
        this.searchBook();
      }
    });
  }

  searchBook() {
    if (!this.bookId) {
      this.errMessage = 'Please enter a Book ID';
      return;
    }
    this._service.getBook(this.bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = err.message || 'Error loading book';
        this.book = null;
      },
    });
  }
}
