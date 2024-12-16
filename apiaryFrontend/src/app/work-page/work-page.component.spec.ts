import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPageComponent } from './work-page.component';

describe('WorkPageComponent', () => {
  let component: WorkPageComponent;
  let fixture: ComponentFixture<WorkPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorkPageComponent]
    });
    fixture = TestBed.createComponent(WorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
