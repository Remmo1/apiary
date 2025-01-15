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
  note: string = '';
  @ViewChild('noteArea') textAreaRef!: ElementRef<HTMLTextAreaElement>;
  onEndSignal = this.speechRecognitionService.onEndSignal;

  constructor(
    public dialogRef: MatDialogRef<AddNoteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private speechService: SpeechService,
    private speechRecognitionService: SpeechRecognitionService,
  ) {  
    this.speechRecognitionService.onResult((text: string) => {

    this.note = this.speechRecognitionService.finalTranscript;
    this.textAreaRef.nativeElement.value = this.note;
    this.isListening = false;
    console.log(this.data.note);
  });
    effect(() => {
      if (this.onEndSignal()) {
        this.data.note += this.note;
      }
    });
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
