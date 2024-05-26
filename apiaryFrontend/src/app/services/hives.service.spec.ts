import { TestBed } from '@angular/core/testing';

import { HivesService } from './hives.service';

describe('HivesService', () => {
  let service: HivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
