import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import {
  Message,
  ClientMessage,
  Content,
  ContentType,
} from './websocket.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ChatService {
  public messages: Subject<any>;
  public messageList: Message[] = [];

  constructor(private _wsService: WebsocketService) {
    this.messages = <Subject<Content | ClientMessage>>(
      _wsService.connect(environment.WS_CHAT_URL).pipe(
        map(
          (response: MessageEvent): Content => {
            let content: Content = JSON.parse(response.data);
            console.log(content);
            if (content.type == ContentType.Error) {
              /* Error Notifying */
              console.log(content.data);
            } else if (content.type == ContentType.Message) {
              /* Message Updating */
              this.messageList.push(content.data);
            } else if (content.type == ContentType.History) {
              /* Message History */
              content.data.forEach((msg: any) => {
                this.messageList.push(msg);
              });
            }

            return content.data;
          }
        )
      )
    );
  }
}
