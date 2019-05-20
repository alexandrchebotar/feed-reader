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
    {url: 'https://www.pravda.com.ua/rss/', name: 'Українська правда', items: pravdaFeed.items, activeItemGuid: 'https://www.pravda.com.ua/news/2019/05/19/7215467/' },
    {url: 'https://pingvinus.ru/rss.xml', name: 'Пингвинус Linux', items: pingvinusFeed.items},
  ];
  private activeFeedUrl: string = this.feeds[0].url;

  getFeeds(): Feed[] {
    return this.feeds;
  };
  getFeed(url: string): Feed {
    return this.feeds.find(feed => feed.url === url);
  };
  getActiveFeedUrl(): string {
    return this.activeFeedUrl;
  };
  setActiveFeed(url: string): void {
    this.activeFeedUrl = url;
  };
  getItems(feedUrl: string = this.activeFeedUrl): Item[] {
    if (feedUrl) {
      return this.getFeed(feedUrl).items;
    } 
  };
  getActiveItemGuid(feedUrl: string = this.activeFeedUrl): string {
    const feed = this.getFeed(feedUrl);
    let activeItemGuid = feed.activeItemGuid;
    if (activeItemGuid) {
      return activeItemGuid;
    }
    activeItemGuid = feed.items[0].guid;
    feed.activeItemGuid = activeItemGuid;
    return activeItemGuid;
  };
  setActiveItem(guid: string, feedUrl: string = this.activeFeedUrl): void {
    const feed = this.getFeed(feedUrl);
    feed.activeItemGuid = guid;
  };
  getActiveItem(): Item {
    const feed = this.getFeed(this.activeFeedUrl);
    const activeItemGuid = feed.activeItemGuid;
    return feed.items.find(item => item.guid === activeItemGuid);
  };

}
