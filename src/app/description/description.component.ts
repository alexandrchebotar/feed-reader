import { Component, Input } from '@angular/core';
import { Item } from '../data.service';

@Component ({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  @Input() item: Item;  
}
