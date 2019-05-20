import { Component, Input } from '@angular/core';
import { Feed } from '../data.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent {
  @Input() feeds: Feed[];
  @Input() activeFeedUrl: string;
  @Input() setActiveFeed: (guid: string) => void;
}
