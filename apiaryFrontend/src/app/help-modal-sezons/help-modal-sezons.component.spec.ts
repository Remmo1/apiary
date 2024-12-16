import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModalSezonsComponent } from './help-modal-sezons.component';

describe('HelpModalSezonsComponent', () => {
  let component: HelpModalSezonsComponent;
  let fixture: ComponentFixture<HelpModalSezonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HelpModalSezonsComponent]
    });
    fixture = TestBed.createComponent(HelpModalSezonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
