import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb2',
  standalone: false,
  templateUrl: './ptb2.html',
  styleUrl: './ptb2.css',
})
export class Ptb2 {
  a_num: number | null = null;
  b_num: number | null = null;
  c_num: number | null = null;

  result: string = '';

  get_solution(): void {
    const a = Number(this.a_num);
    const b = Number(this.b_num);
    const c = Number(this.c_num);

    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
      this.result = 'Vui lòng nhập A, B, C hợp lệ.';
      return;
    }

    this.result = this.solution(a, b, c);
  }

  private solution(a: number, b: number, c: number): string {
    const fmt = (n: number) => String(Math.round(n * 100) / 100);

    // Trường hợp a = 0 => phương trình bậc 1: bx + c = 0
    if (a === 0) {
      if (b === 0) {
        if (c === 0) return 'Phương trình vô số nghiệm.';
        return 'Phương trình vô nghiệm.';
      }

      const x = -c / b;
      return `x = ${fmt(x)}`;
    }

    // Trường hợp bậc 2
    const delta = b * b - 4 * a * c;

    if (delta < 0) return 'Phương trình vô nghiệm.';

    if (delta === 0) {
      const x = -b / (2 * a);
      return `Nghiệm kép: x = ${fmt(x)}`;
    }

    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b + sqrtDelta) / (2 * a);
    const x2 = (-b - sqrtDelta) / (2 * a);
    return `x1 = ${fmt(x1)}, x2 = ${fmt(x2)}`;
  }
}
