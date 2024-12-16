import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModalHivesComponent } from './help-modal-hives.component';

describe('HelpModalHivesComponent', () => {
  let component: HelpModalHivesComponent;
  let fixture: ComponentFixture<HelpModalHivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HelpModalHivesComponent]
    });
    fixture = TestBed.createComponent(HelpModalHivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
