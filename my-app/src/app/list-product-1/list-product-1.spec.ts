import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduct1 } from './list-product-1';

describe('ListProduct1', () => {
  let component: ListProduct1;
  let fixture: ComponentFixture<ListProduct1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProduct1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProduct1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
