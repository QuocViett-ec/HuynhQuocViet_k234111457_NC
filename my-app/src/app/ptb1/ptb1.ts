import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  standalone: false,
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  result: string = '';

  solution(a: number, b: number): string {
    if (a === 0) {
      if (b === 0) {
        return 'Phương trình vô số nghiệm.';
      } else {
        return 'Phương trình vô nghiệm.';
      }
    } else {
      const x = -b / a;
      return `x = ${x}.`;
    }
  }

  get_solution(a: string, b: string): void {
    let a_num = parseFloat(a);
    let b_num = parseFloat(b);
    this.result = this.solution(a_num, b_num);
  }
}
