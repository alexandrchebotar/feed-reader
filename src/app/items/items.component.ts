import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.items = this.dataService.getFeeds()[0].items;
  }

}
