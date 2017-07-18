import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myPeerId: String;
  @Input() someonesId: String;
  connectedWithSomeone: Boolean = false;
  connectedPeople: Array<String> = [];
  peer;

  ngOnInit() {
    this.peer = new Peer('Ottha', {key: '1335g8zosqtr19k9'});
    this.peer.on('open', (id) => {
      this.myPeerId = id;
      console.log('Your connection is now open with  peerId: ' + id);
    });
  }

  connect() {
    const conn = this.peer.connect(this.someonesId);
    conn.on('open', () => {
      this.connectedWithSomeone = true;
      this.connectedPeople.push(this.someonesId);
    });
  }
}
