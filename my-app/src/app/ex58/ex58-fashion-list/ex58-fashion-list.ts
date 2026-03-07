import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Fashion } from '../fashion.model';
import { Ex58Fashion } from '../ex58-fashion';

@Component({
  selector: 'app-ex58-fashion-list',
  standalone: false,
  templateUrl: './ex58-fashion-list.html',
  styleUrl: './ex58-fashion-list.css',
})
export class Ex58FashionList implements OnInit {
  allFashions: Fashion[] = [];
  groupedFashions: { style: string; items: Fashion[] }[] = [];
  styles: string[] = [];
  selectedStyle: string = '';
  searchStyle: string = '';
  loading = true;
  errorMessage = '';

  constructor(
    private service: Ex58Fashion,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStyles();
    this.loadFashions();
  }

  loadStyles(): void {
    this.service.getStyles().subscribe({
      next: (s) => { this.styles = s; this.cdr.markForCheck(); },
      error: () => {},
    });
  }

  loadFashions(style?: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();
    this.service.getAllFashions(style).subscribe({
      next: (data) => {
        this.allFashions = data;
        this.groupByStyle(data);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Không thể tải dữ liệu. Hãy khởi động my-server-mongodb (port 3002).';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  groupByStyle(fashions: Fashion[]): void {
    const map = new Map<string, Fashion[]>();
    fashions.forEach((f) => {
      if (!map.has(f.fashion_style)) map.set(f.fashion_style, []);
      map.get(f.fashion_style)!.push(f);
    });
    this.groupedFashions = Array.from(map.entries()).map(([style, items]) => ({ style, items }));
  }

  // Khi chọn dropdown → reset ô tìm rồi lọc
  onStyleChange(): void {
    this.searchStyle = '';
    this.loadFashions(this.selectedStyle || undefined);
  }

  // Khi bấm Tìm → reset dropdown rồi lọc
  onSearchStyle(): void {
    this.selectedStyle = '';
    this.loadFashions(this.searchStyle.trim() || undefined);
  }

  // Xóa toàn bộ filter, load lại tất cả
  clearFilter(): void {
    this.selectedStyle = '';
    this.searchStyle = '';
    this.loadFashions();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex58-detail', id]);
  }

  editFashion(id: string): void {
    this.router.navigate(['/ex58-edit', id]);
  }

  deleteFashion(id: string, title: string): void {
    if (!confirm(`Bạn có chắc muốn xóa "${title}" không?`)) return;
    const activeStyle = this.selectedStyle || this.searchStyle.trim() || undefined;
    this.service.deleteFashion(id).subscribe({
      next: () => this.loadFashions(activeStyle),
      error: () => alert('Xóa thất bại!'),
    });
  }

  addNew(): void {
    this.router.navigate(['/ex58-create']);
  }

  formatDate(date: any): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  }
}
