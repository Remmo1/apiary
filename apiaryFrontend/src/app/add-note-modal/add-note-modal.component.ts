import { Component, effect, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SpeechService } from '../services/speech.service';
import { SpeechRecognitionService } from '../services/speech-recognition.service';
import { HandGesture } from '../services/hand-gesture.service';
import { log } from '@tensorflow/tfjs-core/dist/log';

export interface DialogData {
  date: Date;
  note: string;
  honey: number;
  syroup: number;
}

@Component({
  selector: 'app-add-note-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatInputModule,   
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule,
    ],
  templateUrl: './add-note-modal.component.html',
  styleUrls: ['./add-note-modal.component.scss']
})
export class AddNoteModalComponent implements OnInit {
  isListening: boolean = false;
  isSpeaking: boolean = false;
  // note: string = '';
  // dotNumber: number = 0;
  @ViewChild('noteArea') textAreaRef!: ElementRef<HTMLTextAreaElement>;

  constructor(
    public dialogRef: MatDialogRef<AddNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private speechService: SpeechService,
    private speechRecognitionService: SpeechRecognitionService,
    private handGestureService: HandGesture,
  ) {  
    this.data.note='';
    this.speechRecognitionService.onResult((text: string) => {

    this.data.note += text;
    this.textAreaRef.nativeElement.value = this.data.note;
    this.isListening = false;
    });
    
    handGestureService.gesture$.subscribe((value) => {
      log(value + ' gesture detected');
      if (value === 'ok') {
        this.speechService.speak("Zapisano notatkę");
        this.dialogRef.close(this.data);
    }});
  }

  ngOnInit(): void 
  {
    this.recording();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hearing() {
    if(!this.isSpeaking) {
      this.speechService.speak(this.data.note);
      this.isSpeaking = true;
    }
    else{
      this.speechService.stop();
      this.isSpeaking = false;
    }
  }

  recording() {
    if(!this.isListening) {
      this.speechRecognitionService.startRecognition();
      this.isListening = true;
    }
  }

  stop(){
    this.speechRecognitionService.stopRecognition(true);
    this.isListening = false;
  }
}
