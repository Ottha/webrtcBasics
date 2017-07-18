import {Component, Input, OnInit} from '@angular/core';
import {Message} from "./Message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myPeerId: String;
  @Input() someonesId: String;
  conn;
  connectedWithSomeone: Boolean = false;
  connectedPeople: Array<String> = [];
  messageText: String;
  messages: Array<Message> = [];
  peer;

  ngOnInit() {
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
}
