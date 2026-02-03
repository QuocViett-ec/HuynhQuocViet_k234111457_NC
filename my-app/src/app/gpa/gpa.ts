import { Component } from '@angular/core';

@Component({
  selector: 'app-gpa',
  standalone: false,
  templateUrl: './gpa.html',
  styleUrl: './gpa.css',
})
export class Gpa {
  processScore: number | null = null;
  midtermScore: number | null = null;
  finalScore: number | null = null;

  gpa: number | null = null;
  classification: string = '';

  onScoresChange(process: string, midterm: string, finalExam: string): void {
    this.processScore = this.parseScore(process);
    this.midtermScore = this.parseScore(midterm);
    this.finalScore = this.parseScore(finalExam);
    this.recalculate();
  }

  clear(processEl: HTMLInputElement, midtermEl: HTMLInputElement, finalEl: HTMLInputElement): void {
    processEl.value = '';
    midtermEl.value = '';
    finalEl.value = '';

    this.processScore = null;
    this.midtermScore = null;
    this.finalScore = null;
    this.gpa = null;
    this.classification = '';
  }

  classificationClick(
    processEl: HTMLInputElement,
    midtermEl: HTMLInputElement,
    finalEl: HTMLInputElement
  ): void {
    this.onScoresChange(processEl.value, midtermEl.value, finalEl.value);
  }

  private recalculate(): void {
    if (this.processScore === null || this.midtermScore === null || this.finalScore === null) {
      this.gpa = null;
      this.classification = '';
      return;
    }

    const avg = (this.processScore + this.midtermScore + this.finalScore) / 3;
    this.gpa = Math.round(avg * 100) / 100;
    this.classification = this.classify(this.gpa);
  }

  private classify(score: number): string {
    if (score > 9.0) return 'Xuất sắc';
    if (score >= 8.0) return 'Tốt';
    if (score >= 7.0) return 'Khá';
    if (score >= 6.0) return 'Trung bình';
    if (score >= 5.0) return 'Yếu';
    return 'Rớt môn';
  }

  private parseScore(value: string): number | null {
    const trimmed = value?.trim?.() ?? '';
    if (trimmed === '') return null;
    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed)) return null;
    if (parsed < 0 || parsed > 10) return null;
    return parsed;
  }
}
