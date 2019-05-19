import { Injectable } from '@angular/core';
import pravdaFeed from './data/pravda.json';
import pingvinusFeed from './data/pingvinus.json';

interface FeedDetails {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
};
export interface Item {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: {};
  categories: string[];
};
export class Feed {
  public feedDetails?: FeedDetails;
  public items?: Item[];
  public activeItemGuid?: string;
  constructor(public url: string, public name: string) {};
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private feeds: Feed[] = [
    {url: 'https://www.pravda.com.ua/rss/', name: 'Українська правда', items: pravdaFeed.items},
    {url: 'https://pingvinus.ru/rss.xml', name: 'Пингвинус Linux', items: pingvinusFeed.items},
  ];
  private activeFeedUrl: string;
  constructor() { };

  getFeeds(): Feed[] {
    return this.feeds;
  };
  getFeed(url: string): Feed {
    return this.feeds.find(feed => feed.url === url);
  };
  getActiveFeed(): Feed {
    return this.getFeed(this.activeFeedUrl);
  };
  setActiveFeed(url: string): void {
    this.activeFeedUrl = url;
  };
  getActiveItem(): Item {
    const activeFeed = this.getActiveFeed();
    return activeFeed.items.find(item => item.guid === activeFeed.activeItemGuid);
  }
  setActiveItem(guid: string): void {
    const activeFeed = this.getActiveFeed();
    activeFeed.activeItemGuid = guid;
  }

}
