import { Component, OnInit } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  urls = [];
  stream:any;
  mediaRecorder:any;
  audioChunks:any[];
  recorder:any;
  audio:any;
  audioBlob:any;
  audioUrl:any;

  constructor() {
    this.audioChunks = [];
   }

  ngOnInit() {
  }
  clickRecordAudio() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        console.log(stream);
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        console.log(this.mediaRecorder);
        this.mediaRecorder.addEventListener("dataavailable", event => {
          console.log('dataavailable');
          this.audioChunks.push(event.data);
          console.log(this.audioChunks);
        });
        this.mediaRecorder.addEventListener("stop", () => {
          console.log('inside stop');
          const audioBlob = new Blob(this.audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play();
        });
      });
  }
  clickToPlayAudio() {
    console.log('stop');
    this.mediaRecorder.stop();
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.urls.push(event.target.result); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
   
}
