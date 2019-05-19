import { Component, Input } from '@angular/core';
import { Item } from '../data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  @Input() items: Item[];
  @Input() activeItemGuid: string;
  @Input() setActiveItem(guid: string) {};
}
