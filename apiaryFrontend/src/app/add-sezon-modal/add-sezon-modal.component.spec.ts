import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSezonModalComponent } from './add-sezon-modal.component';

describe('AddSezonModalComponent', () => {
  let component: AddSezonModalComponent;
  let fixture: ComponentFixture<AddSezonModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddSezonModalComponent]
    });
    fixture = TestBed.createComponent(AddSezonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
