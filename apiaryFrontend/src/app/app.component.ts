import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SpeechService } from './services/speech.service';
import { SpeechRecognitionService } from './services/speech-recognition.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, NavigationBarComponent]
})
export class AppComponent {
  title = 'BeeKing';
  text: string = 'pszczoła';
  isListening: boolean = false;


  constructor(private speechService: SpeechService, private speechRecognitionService: SpeechRecognitionService) { 
    this.speechRecognitionService.onResult((text: string) => {
    this.text = text;
    this.isListening = false;
  });
}

  startListening(): void {
    this.speechRecognitionService.startRecognition();
    this.isListening = true;
  }

  stopListening(): void {
    this.speechRecognitionService.stopRecognition();
    this.isListening = false;
  }
  
  speak(): void {
    this.speechService.speak(this.text);
  }

  stop(): void {
    this.speechService.stop();
  }
}
