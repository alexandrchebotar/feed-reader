import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../data.service';

@Component ({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  item: Item;  
  statisticsVisible: boolean;
  chartVisible: boolean;
  constructor(private _data: DataService) {};

  ngOnInit() {
    this._data.activeItem.subscribe(res => this.item = res);
    this._data.statisticsVisible.subscribe(res => this.statisticsVisible = res);
    this._data.chartVisible.subscribe(res => this.chartVisible = res);
  }

}
