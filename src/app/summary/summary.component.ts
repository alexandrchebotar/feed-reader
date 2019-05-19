import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summary: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.summary = this.dataService.getFeeds()[1].items[0].content;
  }

}
