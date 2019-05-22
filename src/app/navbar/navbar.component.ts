import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isFetching: string | boolean;
  visibleDrawer = false;
  newFeedUrl: string;
  showUnread: boolean;
  feedsVisible: boolean;
  newsVisible: boolean;
  statisticsVisible: boolean;
  feedsSpan: number = 4;
  newsSpan: number = 10;
  descriptinSpan: number = 10;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.fetchingData.subscribe(res => this.isFetching = res);
    this._data.showUnread.subscribe(res => this.showUnread = res);
    this._data.statisticsVisible.subscribe(res => this.statisticsVisible = res);

    this.updateActiveFeed = () => this._data.updateActiveFeed();
    this.updateAllFeeds = () => this._data.updateAllFeeds();
    this.addNewFeed = () => {
      this.closeDrawer();
      this._data.addNewFeed(this.newFeedUrl);
      this.newFeedUrl = '';
    };
    this.toggleFeeds = () => this._data.toggleFeeds();
    this.toggleNews = () => this._data.toggleNews();
    this.toggleStatistics = () => this._data.toggleStatistics();
    this.toggleChart = () => this._data.toggleChart();
    this.toggleUnread = () => this._data.toggleUnread();
    this.readAll = () => this._data.readAll();
    this.manageFeeds = () => this._data.manageFeeds();
    this._data.feedsVisible.subscribe(res => {
      this.feedsVisible = res;
      this._setNewSpans();
    });
    this._data.newsVisible.subscribe(res => {
      this.newsVisible = res;
      this._setNewSpans();
    })
  }
  updateActiveFeed(): void {};
  updateAllFeeds(): void {};
  addNewFeed(): void {};
  openDrawer(): void {
    this.visibleDrawer = true;
  }
  closeDrawer(): void {
    this.visibleDrawer = false;
  }
  toggleFeeds(): void {};
  toggleNews(): void {};
  toggleStatistics(): void {};
  toggleChart(): void {};
  toggleUnread(): void {};
  readAll(): void {};
  manageFeeds(): void {};
  _setNewSpans(): void {
    this.feedsSpan = this.feedsVisible ? 4 : 1;
    this.newsSpan = this.newsVisible ? (this.feedsVisible ? 10 : 11) : 1;
    this.descriptinSpan = this.newsVisible ? (this.feedsVisible ? 10 : 12) : (this.feedsVisible ? 19 : 22);
  }
}
