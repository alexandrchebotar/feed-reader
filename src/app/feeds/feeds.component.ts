import { Component, OnInit } from '@angular/core';
import { DataService, Feed } from '../data.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: Feed[];
  activeFeedUrl: string;
  constructor(private _data: DataService) {};

  activateFeed(url: string): void {};

  ngOnInit() {
    this._data.feeds.subscribe(res => this.feeds = res);
    this._data.activeFeedUrl.subscribe(res => this.activeFeedUrl = res);
    
    this.activateFeed = url => this._data.activateFeed(url);
  }
}
