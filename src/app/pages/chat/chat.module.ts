import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/wschat/websocket.service';
import { ChatService } from '../../services/wschat/wschat.service';
import { LocalStorageService } from '../../services/localstorage/localstorage.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
  ],
  declarations: [ChatComponent],
  providers: [WebsocketService, ChatService, LocalStorageService],
  exports: [ChatComponent],
})
export class ChatModule {}
