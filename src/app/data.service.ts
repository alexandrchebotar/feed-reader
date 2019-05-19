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
  constructor(public url: string, public name: string, public items?: Item[], public feedDetails?: FeedDetails) {};
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private feeds: Feed[] = [
    {url: 'https://www.pravda.com.ua/rss/', name: 'Українська правда', items: pravdaFeed.items},
    {url: 'https://pingvinus.ru/rss.xml', name: 'Пингвинус Linux', items: pingvinusFeed.items},
  ]
  constructor() { }

  getFeed(url: string): Feed {
    return this.feeds.find(feed => feed.url === url);
  }
  getFeeds(): Feed[] {
    return this.feeds;
  }
}
