import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../data.service';

@Component ({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  item: Item;  
  constructor(private _data: DataService) {};

  ngOnInit() {
    this._data.activeItem.subscribe(res => this.item = res);
  }

}
