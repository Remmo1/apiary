import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramesIndicatorComponent } from './frames-indicator.component';

describe('FramesIndicatorComponent', () => {
  let component: FramesIndicatorComponent;
  let fixture: ComponentFixture<FramesIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FramesIndicatorComponent]
    });
    fixture = TestBed.createComponent(FramesIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
