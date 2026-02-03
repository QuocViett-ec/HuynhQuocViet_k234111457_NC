import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex26 } from './ex26';

describe('Ex26', () => {
  let component: Ex26;
  let fixture: ComponentFixture<Ex26>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex26]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex26);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
