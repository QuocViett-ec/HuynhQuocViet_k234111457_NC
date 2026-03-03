import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  standalone: false,
  templateUrl: './loggin.html',
  styleUrl: './loggin.css',
})
export class Loggin implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private _http: HttpClient,
    private _router: Router,
  ) {}

  ngOnInit() {
    // Đọc cookie khi mở trang, tự điền vào form
    this.username = this.getCookie('username');
    this.password = this.getCookie('password');
  }

  getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return decodeURIComponent(value || '');
    }
    return '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;
    const body = { username: this.username, password: this.password };
    this._http.post<any>('/auth/login', body, { withCredentials: true }).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          this._router.navigate(['/ex53']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Tài khoản hoặc mật khẩu không đúng!';
      },
    });
  }
}
