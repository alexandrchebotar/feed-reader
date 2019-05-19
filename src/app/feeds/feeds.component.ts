import { Component, OnInit } from '@angular/core';
import { DataService, Feed } from '../data.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feeds: Feed[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.feeds = this.dataService.getFeeds();
  }

}
