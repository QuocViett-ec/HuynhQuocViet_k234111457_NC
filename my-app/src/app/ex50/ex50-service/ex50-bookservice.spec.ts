import { TestBed } from '@angular/core/testing';

import { Ex50Bookservice } from './ex50-bookservice';

describe('Ex50Bookservice', () => {
  let service: Ex50Bookservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex50Bookservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
