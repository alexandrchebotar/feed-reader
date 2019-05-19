import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  summary: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.summary = this.dataService.getFeeds()[0].items[1].content;
  }

}
