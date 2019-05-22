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
  editFeedUrl: string;
  newFeedName: string;
  visibleDrawer = false;
  constructor(private _data: DataService) {};

  activateFeed(url: string): void {};
  deleteFeed(url: string): void {};
  renameFeed(url: string): void {};
  openDrawer(url: string, name: string): void {
    this.editFeedUrl = url;
    this.newFeedName = name;
    this.visibleDrawer = true;
  }
  closeDrawer(): void {
    this.editFeedUrl = '';
    this.newFeedName = '';
    this.visibleDrawer = false;
  }

  ngOnInit() {
    this._data.feeds.subscribe(res => this.feeds = res);
    this._data.activeFeedUrl.subscribe(res => this.activeFeedUrl = res);
    
    this.activateFeed = url => this._data.activateFeed(url);
    this.deleteFeed = url => this._data.deleteFeed(url);
    this.renameFeed = () => this._data.renameFeed(this.editFeedUrl, this.newFeedName);
  }
}
