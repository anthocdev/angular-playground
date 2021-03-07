import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor() {}

  private subject!: WebSocketSubject<MessageEvent>;

  public connect(url: string): WebSocketSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Connecting to WebSocket: ' + url);
    }
    return this.subject;
  }

  private create(url: string): WebSocketSubject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };

    return WebSocketSubject.create(observer, observable);
  }
}
