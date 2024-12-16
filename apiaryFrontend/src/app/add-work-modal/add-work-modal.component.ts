import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData {
  hiveId: number;
  date: Date;
  note: string;
  honey: number;
  syroup: number;
}

@Component({
  selector: 'app-add-work-modal',
  standalone: true,
  imports: [CommonModule,    
    MatInputModule,   
      MatFormFieldModule,
      MatButtonModule,
      MatDatepickerModule,
      MatDialogModule,
      MatNativeDateModule,
      FormsModule],
  templateUrl: './add-work-modal.component.html',
  styleUrls: ['./add-work-modal.component.scss']
})
export class AddWorkModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AddWorkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
