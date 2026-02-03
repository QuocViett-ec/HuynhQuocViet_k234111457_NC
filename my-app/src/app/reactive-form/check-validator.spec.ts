import { TestBed } from '@angular/core/testing';

import { CheckValidator } from './check-validator';

describe('CheckValidator', () => {
  let service: CheckValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
