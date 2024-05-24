import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class FramesIndicatorComponent implements OnInit{

  @Input() color: string = 'black'; 
  @Input() numberInput = 0; 
  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();
  
  numberOfRectangles: number = 0;
  rectangles: number[] = [];

  maxRectangles = 12;

  ngOnInit(): void {
    this.onInputChange();
  }

  onInputChange(): void {
    const num = Math.min(Math.max(this.numberInput, 0), this.maxRectangles);
    this.numberOfRectangles = num;
    this.rectangles = Array(num).fill(0);
    this.emitValue()
  }

  private emitValue(): void {
    this.valueChanged.emit(this.numberInput); 
  }
}
