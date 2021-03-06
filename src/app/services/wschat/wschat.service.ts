import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { Message, WsMessage } from './websocket.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChatService {
  public messages: Subject<WsMessage>;
  public messageList: WsMessage[] = [];

  constructor(private _wsService: WebsocketService) {
    this.messages = <Subject<WsMessage>>(
      _wsService.connect(environment.WS_CHAT_URL).pipe(
        map(
          (response: MessageEvent): WsMessage => {
            let data = JSON.parse(response.data);

            if (data.type == 'message') {
              //Individual Messages
              this.messageList.push(data);
            } else if (data.type == 'history') {
              //History
              if (data.data.length > 0) {
                data.data.forEach((msg: any) => {
                  console.log(msg);
                  this.messageList.push(JSON.parse(msg));
                });
              }
            }
            return {
              type: data.type,
              data: data.data,
            };
          }
        )
      )
    );
  }
}