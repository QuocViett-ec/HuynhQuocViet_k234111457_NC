import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduct3 } from './list-product-3';

describe('ListProduct3', () => {
  let component: ListProduct3;
  let fixture: ComponentFixture<ListProduct3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProduct3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProduct3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
