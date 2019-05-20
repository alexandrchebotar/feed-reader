import { Component } from '@angular/core';
import { DataService, Item, Feed } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private feeds: Feed[];
  private activeFeedUrl: string;
  private items: Item[];
  private activeItemGuid: string;
  constructor(private dataService: DataService) { };

  setActiveFeed(guid: string) {};
  setActiveItem(guid: string) {};
  updateFeedsData() {
    this.feeds = this.dataService.getFeeds();
    this.activeFeedUrl = this.dataService.getActiveFeedUrl();
  };
  updateItemsData() {
    this.items = this.dataService.getItems(this.activeFeedUrl);
    this.activeItemGuid = this.dataService.getActiveItemGuid(this.activeFeedUrl);
  };

  ngOnInit() {
    this.updateFeedsData();
    this.updateItemsData();
    this.setActiveFeed = (url: string) => {
      this.dataService.setActiveFeed(url);
      this.activeFeedUrl = url;
      this.updateItemsData();
    }
    this.setActiveItem = (guid: string) => {
      this.dataService.setActiveItem(guid);
      this.activeItemGuid = guid;
    }
  }

}
