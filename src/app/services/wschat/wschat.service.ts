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
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ChatService {
  public messages: Subject<any>;
  public messageList: Message[] = [];

  constructor(
    private _wsService: WebsocketService,
    private _notify: NzNotificationService
  ) {
    this.messages = <Subject<Content | ClientMessage>>(
      _wsService.connect(environment.WS_CHAT_URL).pipe(
        map(
          (response: MessageEvent): Content => {
            let content: Content = JSON.parse(response.data);
            console.log(content);
            if (content.type == ContentType.Error) {
              /* Error Notifying */
              this.errorNotify(content.data.body);
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

  errorNotify(message: string): void {
    this._notify.error('What are you doing !?', message, {
      nzDuration: 3500,
      nzPlacement: 'topLeft',
    });
  }
}
