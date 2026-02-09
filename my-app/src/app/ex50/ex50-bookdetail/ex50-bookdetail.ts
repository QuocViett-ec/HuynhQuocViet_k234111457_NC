import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iBookEx50 } from '../ex50-class/ibook-ex50';
import { Ex50Bookservice } from '../ex50-service/ex50-bookservice';

@Component({
  selector: 'app-ex50-bookdetail',
  standalone: false,
  templateUrl: './ex50-bookdetail.html',
  styleUrl: './ex50-bookdetail.css',
})
export class Ex50Bookdetail implements OnInit {
  book: iBookEx50 = {
    BookName: '',
    Price: 0,
    Description: '',
    Image: '',
    DayUpdated: new Date(),
    StockQuantity: 0,
    CategoryId: '',
    NXBId: '',
  };

  mode: 'view' | 'edit' | 'create' = 'view';
  bookId: string | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: Ex50Bookservice,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Check if this is create mode (route: /ex50-create)
    if (this.router.url.includes('ex50-create')) {
      this.mode = 'create';
      return;
    }

    // Get book ID from route params
    this.bookId = this.route.snapshot.paramMap.get('id');

    // Get mode from query params (view or edit)
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'] || 'view';
    });

    if (this.bookId) {
      this.loadBook(this.bookId);
    }
  }

  loadBook(id: string): void {
    console.log('Loading book with ID:', id);
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        console.log('Book loaded:', data);
        this.book = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.errorMessage = 'Không thể tải thông tin sách.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  saveBook(): void {
    if (!this.validateBook()) {
      return;
    }

    if (this.mode === 'create') {
      this.bookService.createBook(this.book).subscribe({
        next: (response) => {
          console.log('Book created:', response);
          alert('Tạo sách mới thành công!');
          this.router.navigate(['/ex50']);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          alert('Không thể tạo sách mới. Vui lòng thử lại.');
        },
      });
    } else if (this.mode === 'edit' && this.bookId) {
      this.bookService.updateBook(this.bookId, this.book).subscribe({
        next: (response) => {
          console.log('Book updated:', response);
          alert('Cập nhật sách thành công!');
          this.router.navigate(['/ex50']);
        },
        error: (error) => {
          console.error('Error updating book:', error);
          alert('Không thể cập nhật sách. Vui lòng thử lại.');
        },
      });
    }
  }

  validateBook(): boolean {
    if (!this.book.BookName || this.book.BookName.trim() === '') {
      alert('Vui lòng nhập tên sách!');
      return false;
    }
    if (!this.book.Price || this.book.Price <= 0) {
      alert('Vui lòng nhập giá hợp lệ!');
      return false;
    }
    if (!this.book.Description || this.book.Description.trim() === '') {
      alert('Vui lòng nhập mô tả sách!');
      return false;
    }
    if (!this.book.Image || this.book.Image.trim() === '') {
      alert('Vui lòng nhập tên file ảnh!');
      return false;
    }
    if (!this.book.StockQuantity || this.book.StockQuantity < 0) {
      alert('Vui lòng nhập số lượng tồn hợp lệ!');
      return false;
    }
    return true;
  }

  cancel(): void {
    this.router.navigate(['/ex50']);
  }

  enableEdit(): void {
    this.mode = 'edit';
  }

  getImageUrl(): string {
    if (!this.book.Image) return '';
    return `ex50-images/${this.book.Image}`;
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
  }

  getTitle(): string {
    if (this.mode === 'create') return 'TẠO MỚI SÁCH';
    if (this.mode === 'edit') return 'CHỈNH SỬA THÔNG TIN SÁCH';
    return 'CHI TIẾT THÔNG TIN SÁCH';
  }
}
