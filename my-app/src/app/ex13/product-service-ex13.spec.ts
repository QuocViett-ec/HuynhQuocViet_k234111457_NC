import { TestBed } from '@angular/core/testing';

import { ProductServiceEx13 } from './product-service-ex13';

describe('ProductServiceEx13', () => {
  let service: ProductServiceEx13;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServiceEx13);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
