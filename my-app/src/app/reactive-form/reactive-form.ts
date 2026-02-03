import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customValidator, passwordValidator } from './check-validator';

@Component({
  selector: 'app-reactive-form',
  standalone: false,
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  public regForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.regForm = this._formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), customValidator(/[0-9#$%^&]/g)]],
        email: ['test@gmail.com'],
        password: [''],
        confirmPass: [''],
      },
      { validators: [passwordValidator] },
    );
  }

  get name() {
    return this.regForm.get('name');
  }
  get email() {
    return this.regForm.get('email');
  }
  get password() {
    return this.regForm.get('password');
  }
  get confirmPass() {
    return this.regForm.get('confirmPass');
  }

  setDefaultValues() {
    this.regForm.setValue({
      name: 'Huỳnh Giao',
      email: 'test@gmail.com',
      password: '',
      confirmPass: '',
    });
  }

  onSubmit() {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    // demo: xem dữ liệu form
    console.log(this.regForm.value);
  }
}
