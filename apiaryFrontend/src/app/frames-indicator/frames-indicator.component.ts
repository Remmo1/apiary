import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-frames-indicator',
  standalone: true,
  imports: [CommonModule,  FormsModule],
  templateUrl: './frames-indicator.component.html',
  styleUrls: ['./frames-indicator.component.scss']
})
export class FramesIndicatorComponent {
  numberOfRectangles: number = 0;
  rectangles: number[] = [];
  numberInput = 0;
  maxRectangles = 12;

  onInputChange(): void {
    const num = Math.min(Math.max(this.numberInput, 0), this.maxRectangles);
    this.numberOfRectangles = num;
    this.rectangles = Array(num).fill(0);
  }
}
