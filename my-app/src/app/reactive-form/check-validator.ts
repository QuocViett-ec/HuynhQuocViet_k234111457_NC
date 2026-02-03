import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    regex.lastIndex = 0;
    const matchName = regex.test(control.value);
    return matchName ? { nameNotMatch: { value: control.value } } : null;
  };
}

export function passwordValidator(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPass');

  if ((password && password.pristine) || (confirmPassword && confirmPassword.pristine)) {
    return null;
  }

  return password && confirmPassword && password.value != confirmPassword.value
    ? { misMatch: true }
    : null;
}

@Injectable({
  providedIn: 'root',
})
export class CheckValidator {}
