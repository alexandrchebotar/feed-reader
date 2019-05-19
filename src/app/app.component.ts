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

  setActiveItem(guid: string) {};

  ngOnInit() {
    this.feeds = this.dataService.getFeeds();
    this.activeFeedUrl = this.dataService.getActiveFeedUrl();
    this.items = this.dataService.getItems();
    this.activeItemGuid = this.dataService.getActiveItemGuid();
    this.setActiveItem = (guid: string) => {
      this.dataService.setActiveItem(guid);
      this.activeItemGuid = guid;
    }
  }

}
