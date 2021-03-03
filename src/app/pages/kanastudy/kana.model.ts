/* Kana object matching JSON file structure */
export enum GameState {
    Stopped = 0,
    Started = 1,
    Ended = 2,
  }
  
  export interface kana {
    char_id: string;
    character: string;
    romanization: string;
  }
  
  export interface kanaTime {
    character: kana;
    time: number;
  }

  export interface kanaMode {
    hiragana: boolean,
    katakana: boolean
  }
  