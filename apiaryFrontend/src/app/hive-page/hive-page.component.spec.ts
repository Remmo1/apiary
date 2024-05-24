import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivePageComponent } from './hive-page.component';

describe('HivePageComponent', () => {
  let component: HivePageComponent;
  let fixture: ComponentFixture<HivePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HivePageComponent]
    });
    fixture = TestBed.createComponent(HivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
