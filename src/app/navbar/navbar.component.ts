import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.updateActiveFeed = () => this._data.updateActiveFeed();
  }
  updateActiveFeed(): void {};
}
