import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  feedsVisible: boolean;
  newsVisible: boolean;
  feedsSpan: number = 4;
  newsSpan: number = 10;
  descriptinSpan: number = 10;
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
  }
  _setNewSpans(): void {
    this.feedsSpan = this.feedsVisible ? 4 : 0;
    this.newsSpan = this.newsVisible ? (this.feedsVisible ? 10 : 12) : 0;
    this.descriptinSpan = this.newsVisible ? (this.feedsVisible ? 10 : 12) : (this.feedsVisible ? 20 : 24);
  }
}
