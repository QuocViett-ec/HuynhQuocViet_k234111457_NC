import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { iBookEx50 } from './ex50-class/ibook-ex50';
import { Ex50Bookservice } from './ex50-service/ex50-bookservice';

@Component({
  selector: 'app-ex50',
  standalone: false,
  templateUrl: './ex50.html',
  styleUrl: './ex50.css',
})
export class Ex50 implements OnInit {
  books: iBookEx50[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private bookService: Ex50Bookservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('loadBooks called');
    this.isLoading = true;
    this.errorMessage = '';
    this.books = [];
    this.cdr.detectChanges();

    this.bookService.getAllBooks().subscribe({
      next: (data: iBookEx50[]) => {
        console.log('Books loaded successfully:', data);
        console.log('Data length:', data.length);
        this.books = [...data];
        this.isLoading = false;
        console.log('Triggering change detection...');
        this.cdr.detectChanges();
        console.log('Change detection completed');
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.errorMessage = 'Không thể tải danh sách sách. Vui lòng kiểm tra kết nối server.';
        this.books = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  createNew(): void {
    this.router.navigate(['/ex50-create']);
  }

  viewDetails(bookId: string | undefined): void {
    if (bookId) {
      this.router.navigate(['/ex50', bookId], { queryParams: { mode: 'view' } });
    }
  }

  editBook(bookId: string | undefined): void {
    if (bookId) {
      this.router.navigate(['/ex50', bookId], { queryParams: { mode: 'edit' } });
    }
  }

  deleteBook(book: iBookEx50): void {
    if (confirm(`Bạn có chắc chắn muốn xóa sách "${book.BookName}" không?`)) {
      if (book.BookId) {
        this.bookService.deleteBook(book.BookId).subscribe({
          next: (response) => {
            console.log('Book deleted:', response);
            alert('Xóa sách thành công!');
            this.loadBooks(); // Reload the list
          },
          error: (error) => {
            console.error('Error deleting book:', error);
            alert('Không thể xóa sách. Vui lòng thử lại.');
          },
        });
      }
    }
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatTime(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
