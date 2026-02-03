import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduct2 } from './list-product-2';

describe('ListProduct2', () => {
  let component: ListProduct2;
  let fixture: ComponentFixture<ListProduct2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProduct2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProduct2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
