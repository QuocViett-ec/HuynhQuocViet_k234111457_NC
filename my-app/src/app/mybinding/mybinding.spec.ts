import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mybinding } from './mybinding';

describe('Mybinding', () => {
  let component: Mybinding;
  let fixture: ComponentFixture<Mybinding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mybinding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mybinding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
