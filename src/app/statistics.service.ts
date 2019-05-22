import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { DataService, Item, Feed } from './data.service';

export class LetterStats {
  constructor(public letter: string, public entries: number) {};
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private _totalFeeds = new BehaviorSubject<number>(0);
  totalFeeds = this._totalFeeds.asObservable();
  private _totalNews = new BehaviorSubject<number>(0);
  totalNews = this._totalNews.asObservable();
  private _totalAuthors = new BehaviorSubject<number>(0);
  totalAuthors = this._totalAuthors.asObservable();
  private _totalLetters = new BehaviorSubject<number>(0);
  totalLetters = this._totalLetters.asObservable();
  private _usedLetters = new BehaviorSubject<number>(0);
  usedLetters = this._usedLetters.asObservable();
  private _letters = new BehaviorSubject<LetterStats[]>([]);
  letters = this._letters.asObservable();
  constructor(private _data: DataService) {
    this._data.feeds.subscribe(res => this.generateFeedsStatistics(res));
    this._data.items.subscribe(res => this.generateItemsStatistics(res));
    this._data.textDescription.subscribe(res => this.generateDescriptionStatistics(res));
  };

  generateFeedsStatistics(feeds: Feed[]): void {
    this._totalFeeds.next(feeds.length);
  }
  generateItemsStatistics(items: Item[]): void {
    if (items) {
      this._totalNews.next(items.length);
      this._totalAuthors.next([...new Set(items.map(item => item.author))].length);
    }
  }
  generateDescriptionStatistics(textDescription: string): void {
    if (textDescription) {
      const regExp = /[a-zа-я]/;
    const allLetters: string[] = [...textDescription.toLowerCase()].filter(sym => regExp.test(sym))
    const unicLetters: string[] = [...new Set(allLetters)];
    this._totalLetters.next(allLetters.length);
    this._usedLetters.next(unicLetters.length);
    this._letters.next(unicLetters.map(letter => new LetterStats(letter, allLetters.filter(symbol => symbol===letter).length)));
    }
  }

}
