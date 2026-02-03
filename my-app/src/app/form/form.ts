import { Component } from '@angular/core';
import { Student } from '../classes/student';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  studentModel = new Student('Nam Anh', 'anh@gmail.com', '0909090909', 'python', 'toi');
  courses = ['python', 'Angular', 'React', 'Vue', 'NodeJS'];
  errFlag = false;

  validateCourse(value: any): void {
    if (value === 'none') this.errFlag = true;
    else this.errFlag = false;
  }
}
