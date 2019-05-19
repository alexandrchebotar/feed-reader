import { Component, OnInit } from '@angular/core';
import { DataService, Feed } from '../data.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  feeds: Feed[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.feeds = this.dataService.getFeeds();
  }

}
