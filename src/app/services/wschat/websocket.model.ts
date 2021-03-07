/* Message Object matching Websocket Server Structure */


  export interface ClientMessage {
    author: string;
    message: string;
  }
  
  /* Content */
export interface Content{
    type: ContentType,
    data: any;
}

export enum ContentType{
    Message = 0,
    History = 1
}

/* Chat Message */
  export interface Message {
    body: string,
    author: Author,
    createdAt: string,
}

export interface Author {
    name: string,
    type: AuthorType
}
export enum AuthorType {
    Server = 0,
    User = 1
}


  