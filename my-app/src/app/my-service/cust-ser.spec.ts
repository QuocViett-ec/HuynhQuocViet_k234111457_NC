import { TestBed } from '@angular/core/testing';

import { CustSer } from './cust-ser';

describe('CustSer', () => {
  let service: CustSer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustSer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
