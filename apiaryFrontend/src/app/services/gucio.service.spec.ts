import { TestBed } from '@angular/core/testing';

import { GucioService } from './gucio.service';

describe('GucioService', () => {
  let service: GucioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GucioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
