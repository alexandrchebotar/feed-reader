import { Component, OnInit } from '@angular/core';
import { DataService, Item } from '../data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  activeItemGuid: string;
  constructor(private _data: DataService) {};

  activateItem(guid: string): void {};
  rearAll(): void {};

  ngOnInit() {
    this._data.items.subscribe(res => this.items = res);
    this._data.activeItemGuid.subscribe(res => this.activeItemGuid = res);
    
    this.activateItem = guid => this._data.activateItem(guid);
    // this.readAll = this._data.readAll;
  }

}
