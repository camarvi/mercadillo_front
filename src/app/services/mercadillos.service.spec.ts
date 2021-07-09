import { TestBed } from '@angular/core/testing';

import { MercadillosService } from './mercadillos.service';

describe('MercadillosService', () => {
  let service: MercadillosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercadillosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
