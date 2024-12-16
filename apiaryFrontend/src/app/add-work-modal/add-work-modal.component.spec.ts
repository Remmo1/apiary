import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkModalComponent } from './add-work-modal.component';

describe('AddWorkModalComponent', () => {
  let component: AddWorkModalComponent;
  let fixture: ComponentFixture<AddWorkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddWorkModalComponent]
    });
    fixture = TestBed.createComponent(AddWorkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
