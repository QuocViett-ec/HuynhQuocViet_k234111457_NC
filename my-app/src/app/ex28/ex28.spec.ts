import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Ex28 } from './ex28';
import { Ex28Service, BpiData } from './ex28-service';

describe('Ex28', () => {
  let component: Ex28;
  let fixture: ComponentFixture<Ex28>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex28],
      providers: [
        {
          provide: Ex28Service,
          useValue: {
            getBitcoinPrice: () =>
              of<BpiData>({
                time: {
                  updated: 'Mar 12, 2023 10:43:00 UTC',
                  updatedISO: '2023-03-12T10:43:00+00:00',
                  updateduk: 'Mar 12, 2023 at 10:43 GMT',
                },
                disclaimer: 'mock',
                chartName: 'Bitcoin',
                bpi: {
                  USD: {
                    code: 'USD',
                    symbol: '&#36;',
                    rate: '20,520.4346',
                    description: 'United States Dollar',
                    rate_float: 20520.4346,
                  },
                  GBP: {
                    code: 'GBP',
                    symbol: '&pound;',
                    rate: '17,146.7110',
                    description: 'British Pound',
                    rate_float: 17146.711,
                  },
                  EUR: {
                    code: 'EUR',
                    symbol: '&euro;',
                    rate: '19,989.8993',
                    description: 'Euro',
                    rate_float: 19989.8993,
                  },
                },
              }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Ex28);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
