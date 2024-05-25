import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHiveModalComponent } from './add-hive-modal.component';

describe('AddHiveModalComponent', () => {
  let component: AddHiveModalComponent;
  let fixture: ComponentFixture<AddHiveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddHiveModalComponent]
    });
    fixture = TestBed.createComponent(AddHiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
