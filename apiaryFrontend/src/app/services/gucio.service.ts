import { Injectable, NgZone, OnInit, signal } from '@angular/core';
import { SpeechService } from './speech.service';
import { SpeechRecognitionService } from './speech-recognition.service';
import { Router } from '@angular/router';
import { HivesService } from './hives.service';

@Injectable({
  providedIn: 'root'
})
export class GucioService{
  userText: string = 'pszczoła';
  isListening: boolean = false;
  recognition: any;
  isManuallyStopped: boolean = false;

  hivesWithNames: Map<number, string> = new Map<number, string>();
  commandSignal = signal<string>(""); 
  
  constructor(private speechService: SpeechService, private router: Router, private ngZone: NgZone, private hivesService: HivesService) {    
    
    const SpeechRecognition = (window as any).webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'pl-PL';
    this.recognition.interimResults = true;
    this.recognition.continuous = true

    this.recognition.onend = () => {
      if (!this.isManuallyStopped) {
        console.log('Speech recognition stopped by the browser, restarting...');
        this.restartRecognition();
      }
    };

    this.onResult((text: string) => {
      this.userText = text;
      this.interpretText();
      this.isListening = false;
    });
  }

  interpretText() : void {
    var text = this.userText.toLowerCase().trim();
    this.ngZone.run(() => {
      if (text.includes('idź') || text.includes('przejdź')) {
        if (text.includes('główną') || text.includes('startową') || text.includes('głównej')) {
          this.speechService.speak("Przechodzę na stronę główną");
          this.router.navigate(['/']);
        } else if (text.includes('ule') || text.includes('pasiekę') || text.includes('pasieki') || text.includes('uli')) {
          this.speechService.speak("Przechodzę na stronę uli");
          this.router.navigate(['/hives']);
        } else if (text.includes('sezony') || text.includes('sezon')) {
          this.speechService.speak("Przechodzę na stronę sezonów");
          this.router.navigate(['/sezons']);
        } else {
          console.log('Command not recognized:', text);
        }
      }

      if (text.includes('pokaż')) {
        if (text.includes('ul')) {
          console.log(text);
          
          this.hivesWithNames.forEach((name, id) => {
            if (text.includes(name)) {
              console.log(name);
              this.speechService.speak("Pokazuję ul " + name);
              this.router.navigate(['/hive', id]);
            }
          });
        }
        else {
          console.log('Command not recognized:', text);
        }
      }

      if(text.includes('dodaj'))
      {
        if(text.includes('notatkę'))
        {
          this.speechService.speak("Dodaję notatkę");
          const currentUrl = this.router.url;
          if(currentUrl.includes('hive'))
          {            
            this.stopRecognition(true);
            this.commandSignal.set('add note');
          }
        }
        else
        {
          console.log('Command not recognized:', text);
        }
      }

    });
    this.commandSignal.set('');
  } 

  startRecognition(): void {
    this.recognition.start();
    this.isListening = true;

    this.hivesService.getHives().subscribe(hives => {
      hives.forEach( hive => {
        console.log(hive);
        
        this.hivesWithNames.set(hive.id, hive.name.toLowerCase());
      });
    });
  }

  stopRecognition(isManuallyStopped: boolean = false): void {
    this.isManuallyStopped = isManuallyStopped;
    this.recognition.stop();
    this.isListening = false;
  }

  
  restartRecognition(): void {
    this.recognition.start();
    this.isManuallyStopped = false;
  }

  onResult(callback: (text: string) => void): void {
    // this.recognition.onresult = (event: any) => {
    //   let transcript = '';
    //   for (let i = event.resultIndex; i < event.results.length; ++i) {
    //     transcript += event.results[i][0].transcript;
    //   }
    //   callback(transcript);
    // };
    // this.recognition.onresult = (event: any) => {
    //   const transcript = event.results[0][0].transcript;
    //   callback(transcript);
    // };
    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      callback(finalTranscript);
    };
  }

  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}
