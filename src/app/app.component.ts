import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mypeerid: String;
  peer;

  ngOnInit() {
    this.peer = new Peer('Ottha', {key: '1335g8zosqtr19k9'});
    this.peer.on('open', (id) => {
      this.mypeerid = id;
      console.log('Your connection is now open with  peerId: ' + id);
    });
  }
}
