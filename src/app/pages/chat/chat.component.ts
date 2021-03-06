import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ViewChildren,
    ElementRef,
    QueryList,
  } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ChatService } from '../../services/wschat/wschat.service';
  import {
    ClientMessage,
    Message,
    WsMessage,
  } from '../../services/wschat/websocket.model';
  @Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
  })
  export class ChatComponent implements OnInit, AfterViewInit {
    @ViewChild('scrollframe', { static: false }) scrollFrame!: ElementRef;
    @ViewChildren('message') itemElements!: QueryList<any>;
    private scrollContainer: any;
    private isNearBottom = false;
    form: FormGroup;
    constructor(public _chatService: ChatService, private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        comment: [null, [Validators.maxLength(100)]]
      });
    }
    
    messageObject: ClientMessage = {
      message: '',
      author: '',
    };
  
    sendMsg() {
      this._chatService.messages.next({
        type: 'message',
        data: this.messageObject,
      });
      this.messageObject.message = '';
    }
  
    ngAfterViewInit() {
      this.scrollContainer = this.scrollFrame.nativeElement;
      this.itemElements.changes.subscribe((_) => this.onItemElementsChanged());
    }
  
    private onItemElementsChanged(): void {
      if (this.isNearBottom) {
        this.scrollToBottom();
      } else {
        console.log('User has not reached bottom yet');
      }
    }
  
    private scrollToBottom(): void {
      this.scrollContainer.scroll({
        top: this.scrollContainer.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  
    scrolled(event: any): void {
      this.isNearBottom = this.isUserNearBottom();
    }
  
    ngOnInit(): void {
      this._chatService.messages.subscribe((msg: WsMessage) => {
        var msgContent: Message = msg.data;
        console.log(
          'WS Server: ' +
            msgContent.author +
            ': ' +
            msgContent.message +
            ' at ' +
            msgContent.date
        );
        console.log(this._chatService.messageList);
      });
    }
  
    private isUserNearBottom(): boolean {
      const threshold = 150;
      const position =
        this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
      const height = this.scrollContainer.scrollHeight;
      return position > height - threshold;
    }
  }
  