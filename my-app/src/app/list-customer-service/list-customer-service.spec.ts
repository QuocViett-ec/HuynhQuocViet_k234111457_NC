import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerService } from './list-customer-service';

describe('ListCustomerService', () => {
  let component: ListCustomerService;
  let fixture: ComponentFixture<ListCustomerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCustomerService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCustomerService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
