import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex50Bookdetail } from './ex50-bookdetail';

describe('Ex50Bookdetail', () => {
  let component: Ex50Bookdetail;
  let fixture: ComponentFixture<Ex50Bookdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex50Bookdetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex50Bookdetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
