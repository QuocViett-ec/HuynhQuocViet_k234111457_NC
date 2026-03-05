import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { Ex63ProductService } from '../ex63-product';
import { Ex63CartService } from '../ex63-cart';

@Component({
  selector: 'app-ex63-product-list',
  standalone: false,
  templateUrl: './ex63-product-list.html',
  styleUrl: './ex63-product-list.css',
})
export class Ex63ProductList implements OnInit {
  products: Product[] = [];
  cartCount: number = 0;
  addedProductId: string | null = null;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private productService: Ex63ProductService,
    private cartService: Ex63CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartCount();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Không thể tải danh sách sản phẩm. Server chưa chạy?';
        this.loading = false;
      },
    });
  }

  loadCartCount(): void {
    this.cartService.getCart().subscribe({
      next: (res) => (this.cartCount = res.cart.length),
      error: () => {},
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product._id!, 1).subscribe({
      next: (res) => {
        this.cartCount = res.cart.length;
        this.addedProductId = product._id!;
        setTimeout(() => (this.addedProductId = null), 1500);
      },
      error: (err) => {
        this.errorMessage = 'Lỗi khi thêm vào giỏ hàng!';
      },
    });
  }

  goToCart(): void {
    this.router.navigate(['/ex63-cart']);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' ₫';
  }
}
