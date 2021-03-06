/* Message Object matching Websocket Server Structure */

export interface WsMessage {
    type: string;
    data: any;
  }
  export interface ClientMessage {
    author: string;
    message: string;
  }
  
  export interface Message {
    author: string;
    message: string;
    date: string;
    isServer: boolean;
  }


  