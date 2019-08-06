import { Component } from '@angular/core';
import WebSocket from 'ws'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-iot';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log("atr ameo")
    let algo = this.http.get('localhost:3000')
    console.log(algo)

    const ws = new WebSocket('ws://localhost:8080', {
      perMessageDeflate: false
    });

    ws.on('open', function open() {
      ws.send('something');
    });
     
    ws.on('message', function incoming(data) {
      console.log(data);
    });
  }
}
