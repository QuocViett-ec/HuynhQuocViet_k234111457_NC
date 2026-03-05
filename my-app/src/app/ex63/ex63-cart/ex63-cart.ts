import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CheckoutForm } from '../product.model';
import { Ex63CartService } from '../ex63-cart';

@Component({
  selector: 'app-ex63-cart',
  standalone: false,
  templateUrl: './ex63-cart.html',
  styleUrl: './ex63-cart.css',
})
export class Ex63CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  loading: boolean = true;
  checkingOut: boolean = false;
  showCheckoutForm: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  checkoutForm: CheckoutForm = {
    customerName: '',
    customerPhone: '',
    customerAddress: '',
  };

  constructor(
    private cartService: Ex63CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = res.cart;
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Kh\u00f4ng th\u1ec3 t\u1ea3i gi\u1ecf h\u00e0ng.';
        this.loading = false;
      },
    });
  }

  updateQuantity(item: CartItem, newQty: number): void {
    if (newQty < 1) {
      this.removeItem(item);
      return;
    }
    this.cartService.updateQuantity(item.productId, newQty).subscribe({
      next: (res) => {
        this.cartItems = res.cart;
        this.total = res.total;
      },
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.productId).subscribe({
      next: (res) => {
        this.cartItems = res.cart;
        this.total = res.total;
      },
    });
  }

  clearCart(): void {
    if (
      !confirm(
        'B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n x\u00f3a to\u00e0n b\u1ed9 gi\u1ecf h\u00e0ng?',
      )
    )
      return;
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.cartItems = [];
        this.total = 0;
      },
    });
  }

  toggleCheckout(): void {
    this.showCheckoutForm = !this.showCheckoutForm;
    this.successMessage = '';
    this.errorMessage = '';
  }

  submitOrder(): void {
    if (!this.checkoutForm.customerName || !this.checkoutForm.customerPhone) {
      this.errorMessage =
        'Vui l\u00f2ng nh\u1eadp h\u1ecd t\u00ean v\u00e0 s\u1ed1 \u0111i\u1ec7n tho\u1ea1i!';
      return;
    }
    this.checkingOut = true;
    this.cartService.checkout(this.checkoutForm).subscribe({
      next: (res) => {
        this.cartItems = [];
        this.total = 0;
        this.showCheckoutForm = false;
        this.checkingOut = false;
        const orderId = res.orderId?.$oid || String(res.orderId);
        this.successMessage = `\u2705 ${res.message} (M\u00e3 \u0111\u01a1n: ${orderId})`;
        this.checkoutForm = { customerName: '', customerPhone: '', customerAddress: '' };
      },
      error: (err) => {
        this.checkingOut = false;
        this.errorMessage = err.error?.error || 'L\u1ed7i \u0111\u1eb7t h\u00e0ng!';
      },
    });
  }

  goShopping(): void {
    this.router.navigate(['/ex63']);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' \u20ab';
  }
}
