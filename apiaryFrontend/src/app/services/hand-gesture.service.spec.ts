import { TestBed } from '@angular/core/testing';

import { HandGesture } from './hand-gesture.service';

describe('HandGestureService', () => {
  let service: HandGesture;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandGesture);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
