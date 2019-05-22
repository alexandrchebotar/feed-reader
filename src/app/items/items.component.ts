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
  showUnread: boolean;
  constructor(private _data: DataService) {};

  activateItem(guid: string): void {};
  rearAll(): void {};

  ngOnInit() {
    this._data.items.subscribe(res => this.items = this.showUnread ? res.filter(item => !item.isRead) : res);
    this._data.showUnread.subscribe(res => {
      this.showUnread = res;
      this.items = this.showUnread ? this.items.filter(item => !item.isRead) : this._data._getItems();
    });
    this._data.activeItemGuid.subscribe(res => this.activeItemGuid = res);
    
    this.activateItem = guid => this._data.activateItem(guid);
  }

}
