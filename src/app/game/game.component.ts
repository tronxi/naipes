import { Component, OnInit } from '@angular/core';
import {PreferencesService} from '../services/preferences.service';
import {Card} from './card';
import {TokenService} from '../services/token.service';
import {RecordsService} from '../services/records.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  time: number;
  numCards: number;
  cards: Card[];
  cardsImages: string[];
  firstCard: number;
  secondCard: number;
  score: number;
  timer;
  timeScores = new Map();
  numCardScores = new Map();
  showWin: boolean;
  showLose: boolean;
  showSavedScore: boolean;

  constructor(private preferencesServices: PreferencesService,
              public tokenService: TokenService,
              private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.initScores();
    this.initGame();
  }

  initScores(): void {
    this.timeScores.set(0, 0);
    this.timeScores.set(60, 100);
    this.timeScores.set(90, 75);
    this.timeScores.set(120, 50);
    this.timeScores.set(150, 25);
    this.numCardScores.set(20, 0);
    this.numCardScores.set(26, 25);
    this.numCardScores.set(32, 50);
  }

  initGame(): void {
    this.showSavedScore = false;
    this.showWin = false;
    this.showLose = false;
    this.firstCard = null;
    this.secondCard =  null;
    this.cards = [];
    this.time = Number(this.preferencesServices.get('time', '0'));
    this.numCards = Number(this.preferencesServices.get('numCards', '20'));
    clearInterval(this.timer);
    if (this.time !== 0) {
      this.timer = setInterval(() => this.checkInterval(), 1000);
    }
    this.score = 0;
    this.cardsImages = this.generateRandomDeck();
    this.generateCards();
  }

  checkInterval(): void {
    this.time -= 1;
    if (this.time === 0) {
      if (this.checkWin()) {
        this.win();
      } else {
        this.lose();
      }
    }
  }

  win(): void {
    this.score += this.timeScores.get(Number(this.preferencesServices.get('time', '0')));
    this.score += this.numCardScores.get(this.numCards);
    clearInterval(this.timer);
    this.showWin = true;
  }

  lose(): void {
    clearInterval(this.timer);
    this.showLose = true;
  }

  resetGame(): void {
    this.initGame();
  }

  saveScore(): void {
    const score = this.score;
    const numCards = this.numCards;
    const time = Number(this.preferencesServices.get('time', '0'));
    this.recordsService.save(score, numCards, time).subscribe(
      response => {
        this.showSavedScore = true;
      }, error => {
        console.log(error);
      }
    );
  }

  processClick(id): void {
    if (this.showLose) {return; }
    if (this.cards[id].reversed) { return; }

    if (this.firstCard == null) {
      this.firstCard = id;
      this.cards[id].reverse();

    } else if (this.secondCard === null && id !== this.firstCard) {
      this.secondCard = id;
      this.cards[id].reverse();
    }

    if (this.firstCard !== null && this.secondCard !== null) {
      if (this.checkEquals(this.firstCard, this.secondCard)) {
        this.score += 15;
        this.firstCard = null;
        this.secondCard = null;
        if (this.checkWin()) {
          this.win();
        }
      } else {
        this.score -= 5;
        setTimeout(() => this.revertLostImages(this.firstCard, this.secondCard), 700);
      }
    }
  }

  checkWin(): boolean {
    for (const card of this.cards) {
      if (!card.reversed) {
        return false;
      }
    }
    return true;
  }

  revertLostImages(firstCard: number, secondCard: number): void {
    this.cards[firstCard].reverse();
    this.cards[secondCard].reverse();

    this.firstCard = null;
    this.secondCard = null;
  }

  checkEquals(firstCard: number, secondCard: number): boolean {
    return this.cards[firstCard].image === this.cards[secondCard].image;
  }

  generateCards(): void {
    for (let i = 0; i < this.numCards; i++) {
      this.cards.push(new Card(i, this.cardsImages[i], false));
    }
  }
  generateRandomDeck(): string[] {
    const array = this.getDeckNames().slice(0, this.numCards / 2).concat(this.getDeckNames().slice(0, this.numCards / 2));
    this.shuffle(array);
    return array;
  }

  shuffle(array): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  getDeckNames(): string[] {
    return ['2C', '2C', '2C', '2C', 'AH', 'AH', 'AH', 'AH', '2C', '2C', '2C', '2C', 'AH', 'AH', 'AH', 'AH']; // Use this to play with only two cards
    // return ['2C', '10C', 'AC', 'AD', 'AH', 'AS', 'JH', 'KS', 'QS', '9H', '3C', '4D', '5H', '6S', '7D', '8D'];
  }
}
