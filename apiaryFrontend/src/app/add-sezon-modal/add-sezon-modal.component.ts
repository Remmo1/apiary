import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData {
  startDate:string;
  endDate:string;
  name: string;
}

@Component({
  selector: 'app-add-sezon-modal',
  standalone: true,
  imports: [CommonModule, 
    MatInputModule,   
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule],
  templateUrl: './add-sezon-modal.component.html',
  styleUrls: ['./add-sezon-modal.component.scss']
})
export class AddSezonModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddSezonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
