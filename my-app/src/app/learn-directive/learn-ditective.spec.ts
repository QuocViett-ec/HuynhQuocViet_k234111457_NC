import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnDitective } from './learn-ditective';

describe('LearnDitective', () => {
  let component: LearnDitective;
  let fixture: ComponentFixture<LearnDitective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnDitective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnDitective);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
