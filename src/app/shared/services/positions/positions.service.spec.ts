import { TestBed } from '@angular/core/testing';

import { PositionsService } from './positions.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PositionsService', () => {
  let service: PositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(PositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
