import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gpa } from './gpa';

describe('Gpa', () => {
  let component: Gpa;
  let fixture: ComponentFixture<Gpa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gpa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gpa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
