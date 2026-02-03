import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Ex28Service } from './ex28-service';

describe('Ex28Service', () => {
  let service: Ex28Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(Ex28Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
