import { Component, HostListener, OnInit } from '@angular/core';
import katakanaStore from '../../../assets/json/kana/katakana.json';
import hiraganaStore from '../../../assets/json/kana/hiragana.json';
import { kana, kanaTime, GameState, kanaMode } from './kana.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-kana',
  templateUrl: './kana.component.html',
  styleUrls: ['./kana.component.css'],
})
export class KanaComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key >= 'a' && event.key <= 'z') this.takeInput(event.key); //Letters only
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    /* Starting a game - Enter override */
    if (event.key == 'Enter' && this.state == GameState.Stopped) {
      if (!this._kanaModes.Hiragana && !this._kanaModes.Katakana) {
        this.notifyBlank();
        return;
      } //If none selected
      this.state = GameState.Started;
      this.startLogic();
    }
    /*Clearing text - Backspace override */
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (this.state != GameState.Started) return; //No changes if not playing
      if (this.roman.length > 0)
        this.roman = this.roman.slice(0, this.roman.length - 1);
    }
    /*Stopping running session - Escape override*/
    if (event.key === 'Escape') {
      if (this.state !== GameState.Started) return;
      this.state = GameState.Stopped;
    }
  }

  /* Configuration */
  _kanaModes: kanaMode = { Hiragana: true, Katakana: false };
  _cheats = false;
  _kanaCount = 10;
  /* Active Objects */
  stateEnum = GameState; //Declaring enum for use in templates
  state: GameState = GameState.Stopped; //State of the game
  kanaDatabase: kana[] = []; //Storage for hira/kata kanas based on state
  randomKana!: kana; //Chosen random letter
  kanaTimes: kanaTime[] = []; //Letter timings
  avgTime: number = 0; //average time per kana
  roman: string = 'Key in romanization'; //Bound input
  score: number = 0; //Counter for correct kana
  timer: number = 0; //Timer for each kana
  interval: any; //Interval calculation for timer
  constructor(private _notify: NzNotificationService) {}

  takeInput(val: any): void {
    if (this.state != GameState.Started) return; //No changes if not playing
    this.roman.length >= 3 ? (this.roman = val) : (this.roman += val);
    if (this.roman == this.randomKana.romanization) {
      this.scoreGet();
    }
  }

  startLogic(): void {
    if (this._kanaModes.Hiragana == true)
      hiraganaStore.map((val: any) => this.kanaDatabase.push(val));
    if (this._kanaModes.Katakana == true)
      katakanaStore.map((val: any) => this.kanaDatabase.push(val));

    console.log(this.kanaDatabase);
    this.getRandomKana();
    this.startTimer(); //Start interval calculation
  }
  endLogic(): void {
    //When specific score is reached display timings (sorted);
    this.state = GameState.Ended; // Stop the game
    this.avgTime =
      this.kanaTimes.reduce((a, b) => a + b.time, 0) / this.kanaTimes.length; //Calculate average time per kana
    this.kanaTimes.sort((a, b) => b.time - a.time); //Sort results by time
  }

  scoreGet(): void {
    var ktObj: kanaTime = {
      character: this.randomKana,
      time: Math.round(this.timer * 100) / 1000,
    }; // New kana time object using active data
    this.kanaTimes.push(ktObj); //Store time
    this.score++; //Up score
    if (this.score >= this._kanaCount) this.endLogic();
    this.getRandomKana(); //Get new kana
    this.roman = ''; // Reset input
  }

  startTimer(): void {
    clearInterval(this.interval); //Prevent interval stacking
    this.interval = setInterval(() => {
      this.timer += 0.01;
    }, 10);
  }

  getRandomKana(): void {
    this.timer = 0; //Reset time
    this.randomKana = this.kanaDatabase[
      Math.ceil(Math.random() * this.kanaDatabase.length)
    ]; //Just some basic math
    if (this.randomKana == undefined) this.getRandomKana(); //temp solution
  }

  notifyBlank(): void {
    this._notify.error('What are you doing !?', 'Select an alphabet to play.', {
      nzDuration: 3500,
      nzPlacement: 'topRight',
    });
  }
  ngOnInit(): void {}
}
