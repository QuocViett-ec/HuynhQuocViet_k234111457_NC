import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Fashion } from '../fashion.model';
import { Ex58Fashion } from '../ex58-fashion';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-ex58-fashion-detail',
  standalone: false,
  templateUrl: './ex58-fashion-detail.html',
  styleUrl: './ex58-fashion-detail.css',
})
export class Ex58FashionDetail implements OnInit, OnDestroy {
  mode: 'view' | 'edit' | 'create' = 'view';
  fashion: Fashion = { fashion_title: '', fashion_details: '', thumbnail: '', fashion_style: '' };
  safeDetails: SafeHtml = '';
  styles: string[] = ['Casual', 'Formal', 'Sporty'];
  loading = true;
  saving = false;
  errorMessage = '';
  successMessage = '';

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58Fashion,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Load styles once
    this.service.getStyles().subscribe({ next: (s) => { this.styles = s; this.cdr.markForCheck(); }, error: () => {} });

    // combineLatest(url + paramMap) emits whenever EITHER changes →
    // correctly handles component reuse across detail/edit/create routes
    this.routeSub = combineLatest([this.route.url, this.route.paramMap]).subscribe(
      ([segments, params]) => {
        const fullPath = segments.map(s => s.path).join('/');
        const id = params.get('id');

        // Reset state on every navigation
        this.loading = true;
        this.saving = false;
        this.errorMessage = '';
        this.successMessage = '';
        this.fashion = { fashion_title: '', fashion_details: '', thumbnail: '', fashion_style: '' };
        this.safeDetails = '';
        this.cdr.markForCheck();

        if (fullPath.startsWith('ex58-create')) {
          this.mode = 'create';
          this.loading = false;
          this.cdr.markForCheck();
        } else if (fullPath.startsWith('ex58-edit')) {
          this.mode = 'edit';
          this.loadFashion(id!);
        } else {
          this.mode = 'view';
          this.loadFashion(id!);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  loadFashion(id: string): void {
    this.service.getFashionById(id).subscribe({
      next: (data) => {
        this.fashion = data;
        this.safeDetails = this.sanitizer.bypassSecurityTrustHtml(data.fashion_details || '');
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Không thể tải dữ liệu.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  save(): void {
    if (!this.fashion.fashion_title || !this.fashion.fashion_style) {
      this.errorMessage = 'Vui lòng nhập Tiêu fashion và Style!';
      return;
    }
    this.saving = true;
    this.errorMessage = '';
    if (this.mode === 'create') {
      this.service.createFashion(this.fashion).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/ex58']);
        },
        error: () => {
          this.saving = false;
          this.errorMessage = 'Lỗi khi tạo mới!';
          this.cdr.markForCheck();
        },
      });
    } else {
      this.service.updateFashion(this.fashion._id!, this.fashion).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/ex58']);
        },
        error: () => {
          this.saving = false;
          this.errorMessage = 'Lỗi khi cập nhật!';
          this.cdr.markForCheck();
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/ex58']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
