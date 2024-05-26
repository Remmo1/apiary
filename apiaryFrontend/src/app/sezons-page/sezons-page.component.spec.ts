import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SezonsPageComponent } from './sezons-page.component';

describe('SezonsPageComponent', () => {
  let component: SezonsPageComponent;
  let fixture: ComponentFixture<SezonsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SezonsPageComponent]
    });
    fixture = TestBed.createComponent(SezonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
