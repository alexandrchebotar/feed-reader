import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  feedsVisible: boolean;
  newsVisible: boolean;
  feedsSpan: number = 4;
  newsSpan: number = 10;
  descriptinSpan: number = 10;
  timerId: number;
  constructor(private _data: DataService) {}

  ngOnInit() {
    this._data.feedsVisible.subscribe(res => this.feedsVisible = res);
    this._data.newsVisible.subscribe(res => this.newsVisible = res);

    this._data.feedsVisible.subscribe(res => {
      this.feedsVisible = res;
      this._setNewSpans();
    });
    this._data.newsVisible.subscribe(res => {
      this.newsVisible = res;
      this._setNewSpans();
    })
    this._data.updateAllFeeds();
    this.timerId = window.setInterval(this._data.updateAllFeeds, 300000);
  }
  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  _setNewSpans(): void {
    this.feedsSpan = this.feedsVisible ? 4 : 0;
    this.newsSpan = this.newsVisible ? (this.feedsVisible ? 10 : 12) : 0;
    this.descriptinSpan = this.newsVisible ? (this.feedsVisible ? 10 : 12) : (this.feedsVisible ? 20 : 24);
  }
}
