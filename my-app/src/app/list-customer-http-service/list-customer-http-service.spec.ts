import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerHttpService } from './list-customer-http-service';

describe('ListCustomerHttpService', () => {
  let component: ListCustomerHttpService;
  let fixture: ComponentFixture<ListCustomerHttpService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCustomerHttpService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCustomerHttpService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
