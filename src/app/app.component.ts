import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from "./Message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myPeerId: String;
  @Input() someonesId: String;
  @ViewChild('myvideo') myVideo: any;
  conn;
  connectedWithSomeone: Boolean = false;
  connectedPeople: Array<String> = [];
  messageText: String;
  messages: Array<Message> = [];
  peer;

  ngOnInit() {
    const video = this.myVideo.nativeElement;

    this.peer = new Peer('Ottha', {key: '1335g8zosqtr19k9'});
    this.peer.on('open', (id) => {
      this.myPeerId = id;
      console.log('Your connection is now open with  peerId: ' + id);
    });
    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        console.log(data);
        const message: Message = JSON.parse(data);
        console.log(message);
        this.messages.push(message);
      });
    });
    this.peer.on('call', (call) => {
      const n = <any>navigator;
      n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );
      n.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream){
          video.src = URL.createObjectURL(remotestream);
          video.play();
        });
      }, function(err) {
        console.log('Failed to get stream', err);
      });
    });
  }

  connect() {
    this.conn = this.peer.connect(this.someonesId);
    this.conn.on('open', () => {
      this.connectedWithSomeone = true;
      this.connectedPeople.push(this.someonesId);
    });
  }
  sendMessage() {
    const message = new Message(Date.now(), this.myPeerId, this.messageText  )
    this.conn.send(JSON.stringify(message));
  }
  videoCall() {
    const video = this.myVideo.nativeElement;
    const localvar = this.peer;
    const fname = this.someonesId;

    const n = <any>navigator;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

    n.getUserMedia({video: true, audio: true}, function(stream) {
      const call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.src = URL.createObjectURL(remotestream);
        video.play();
      });
    }, function(err){
      console.log('Failed to get stream', err);
    });
  }
}
