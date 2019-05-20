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
  private activeItem: Item;
  constructor(private dataService: DataService) { };

  setActiveFeed(guid: string) {};
  setActiveItem(guid: string) {};
  updateFeedsData() {
    this.feeds = this.dataService.getFeeds();
    this.activeFeedUrl = this.dataService.getActiveFeedUrl();
    this.updateItemsData();
  };
  updateItemsData() {
    this.items = this.dataService.getItems(this.activeFeedUrl);
    this.activeItemGuid = this.dataService.getActiveItemGuid(this.activeFeedUrl);
    this.updateDescriptionData();
  };
  updateDescriptionData() {
    this.activeItem = this.dataService.getActiveItem();
  }

  ngOnInit() {
    this.updateFeedsData();
    this.setActiveFeed = (url: string) => {
      if (url !== this.activeFeedUrl) {
        this.dataService.setActiveFeed(url);
      this.activeFeedUrl = url;
      this.updateItemsData();
      }
    }
    this.setActiveItem = (guid: string) => {
      if (guid !== this.activeItemGuid) {
        this.dataService.setActiveItem(guid);
        this.activeItemGuid = guid;
        this.updateDescriptionData();
      }
    }
  }

}
