import { TestBed } from '@angular/core/testing';

import { SezonsService } from './sezons.service';

describe('SezonsService', () => {
  let service: SezonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SezonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
