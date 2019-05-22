import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalFeeds: number;
  totalNews: number;
  totalAuthors: number;
  totalLetters: number;
  usedLetters: number;
  feedsVisible: boolean;
  newsVisible: boolean;
  statisticsVisible: boolean;
  feedsSpan: number = 4;
  newsSpan: number = 10;
  descriptinSpan: number = 10;
  constructor(private _data: DataService, private _statistics: StatisticsService) { };

  ngOnInit() {
    this._statistics.totalFeeds.subscribe(res => this.totalFeeds = res);
    this._statistics.totalNews.subscribe(res => this.totalNews = res);
    this._statistics.totalAuthors.subscribe(res => this.totalAuthors = res);
    this._statistics.totalLetters.subscribe(res => this.totalLetters = res);
    this._statistics.usedLetters.subscribe(res => this.usedLetters = res);
    this._data.statisticsVisible.subscribe(res => this.statisticsVisible = res);
    this._data.feedsVisible.subscribe(res => {
      this.feedsVisible = res;
      this._setNewSpans();
    });
    this._data.newsVisible.subscribe(res => {
      this.newsVisible = res;
      this._setNewSpans();
    })
  }
  _setNewSpans(): void {
    this.feedsSpan = this.feedsVisible ? 4 : 1;
    this.newsSpan = this.newsVisible ? (this.feedsVisible ? 10 : 11) : 1;
    this.descriptinSpan = this.newsVisible ? (this.feedsVisible ? 10 : 12) : (this.feedsVisible ? 19 : 22);
  }
}
