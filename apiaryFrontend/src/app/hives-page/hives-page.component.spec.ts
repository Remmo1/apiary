import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivesPageComponent } from './hives-page.component';

describe('HivesPageComponent', () => {
  let component: HivesPageComponent;
  let fixture: ComponentFixture<HivesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HivesPageComponent]
    });
    fixture = TestBed.createComponent(HivesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
