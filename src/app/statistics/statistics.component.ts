import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';

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
  constructor(private _statistics: StatisticsService) { };

  ngOnInit() {
    this._statistics.totalFeeds.subscribe(res => this.totalFeeds = res);
    this._statistics.totalNews.subscribe(res => this.totalNews = res);
    this._statistics.totalAuthors.subscribe(res => this.totalAuthors = res);
    this._statistics.totalLetters.subscribe(res => this.totalLetters = res);
    this._statistics.usedLetters.subscribe(res => this.usedLetters = res);
  }
}
