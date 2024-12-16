import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModalWorksComponent } from './help-modal-works.component';

describe('HelpModalWorksComponent', () => {
  let component: HelpModalWorksComponent;
  let fixture: ComponentFixture<HelpModalWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HelpModalWorksComponent]
    });
    fixture = TestBed.createComponent(HelpModalWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
