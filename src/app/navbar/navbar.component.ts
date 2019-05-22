import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isFetching: string | boolean;
  visible = false;
  newFeed: string;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.fetchingData.subscribe(res => this.isFetching = res);

    this.updateActiveFeed = () => this._data.updateActiveFeed();
    this.addNewFeed = () => {
      this.closeDrawer();
      this._data.addNewFeed(this.newFeed);
    }
  }
  updateActiveFeed(): void {};
  addNewFeed(): void {};
  openDrawer(): void {
    this.visible = true;
  }
  closeDrawer(): void {
    this.visible = false;
  }
}
