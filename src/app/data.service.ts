import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import pravdaFeed from './data/pravda.json';
import pingvinusFeed from './data/pingvinus.json';
import redditFeed from './data/reddit.json';
import nnmClubFeed from './data/nnm-club.json';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';

interface FeedDetails {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
};
export class Item {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  description: string;
  isRead: boolean;
  constructor(item: any) {
    item.isRead = false;
    return item;
  }
};
export class Feed {
  constructor(public url: string, public name?: string, public items?: Item[], public activeItemGuid?: string) {};
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _fetchingData = new BehaviorSubject<boolean>(false);
  fetchingData = this._fetchingData.asObservable();
  private _feeds = new BehaviorSubject<Feed[]>( this._loadFeedsFromStorage() ||
    [
      {url: 'https://nnmclub.to/forum/rssp.xml', name: 'NNM-Club', items: nnmClubFeed.items.map(item => new Item(item)) },
      {url: 'https://www.pravda.com.ua/rss/', name: 'Українська правда', items: pravdaFeed.items.map(item => new Item(item)), activeItemGuid: 'https://www.pravda.com.ua/news/2019/05/19/7215467/' },
      {url: 'https://pingvinus.ru/rss.xml', name: 'Пингвинус Linux', items: pingvinusFeed.items.map(item => new Item(item))},
      {url: 'https://www.reddit.com/.rss', name: 'reddit: the front page of the internet', items: redditFeed.items.map(item => new Item(item))},
    ]
  );
  feeds = this._feeds.asObservable();
  private _activeFeedUrl = new BehaviorSubject<string>(this._loadActiveFeedUrlFromStorage() || this._getActiveFeedUrl());
  activeFeedUrl = this._activeFeedUrl.asObservable();
  private _activeFeed = new BehaviorSubject<Feed>(this._getActiveFeed());
  activeFeed = this._activeFeed.asObservable();
  private _items = new BehaviorSubject<Item[]>(this._getItems());
  items = this._items.asObservable();
  private _activeItemGuid = new BehaviorSubject<string>(this._getActiveItemGuid());
  activeItemGuid = this._activeItemGuid.asObservable();
  private _activeItem = new BehaviorSubject<Item>(this._getactiveItem());
  activeItem = this._activeItem.asObservable();
  private _textDescription = new BehaviorSubject<string>(this._getTextDescription());
  textDescription = this._textDescription.asObservable();

  constructor(private _storage: StorageService, private _http: HttpService) {};

  activateFeed(url: string): void {
    this._activeFeedUrl.next(url);
    this._activeFeed.next(this._getActiveFeed());
    this._items.next(this._getItems());
    this._activeItemGuid.next(this._getActiveItemGuid());
    this._activeItem.next(this._getactiveItem());
    this._textDescription.next(this._getTextDescription());
    this._saveToStorage();
  };
  activateItem(guid: string): void {
    const feed = this._getActiveFeed();
    feed.activeItemGuid = guid;
    this._activeFeed.next(feed);
    this._activeItemGuid.next(guid);
    this.read(guid);
    this._activeItem.next(this._getactiveItem());
    this._textDescription.next(this._getTextDescription());
    this._saveToStorage();
  };
  read(guid): void {
    this._getItem(guid).isRead=true;
    this._saveToStorage();
  };
  readAll(): void {
    this._getItems().map(item => item.isRead=true);
    this._saveToStorage();
  };
  updateActiveFeed(): void {
    this._fetchingData.next(true);
    this._http.fetchFeed(this._activeFeedUrl.getValue()).subscribe(
      res => {
        const {feed: resFeed , items: resItems} = res;
        const {url: resUrl, title: resName} = resFeed;
        const feeds = this._getFeeds();
        const feed = feeds.find(feed => feed.url === resUrl);
        let {url, name, items} = feed;
        let newItems: Item[] = resItems.map((item: any) => new Item(item));
        if (items) {
          newItems = newItems.filter(newItem => !items.some(item => item.guid === newItem.guid));
          feed.items = [...newItems, ...items];
        } else {
          feed.items = newItems;
        }
        feed.name = name || resName;
        this._feeds.next(feeds);
        this.activateFeed(url);
        this._saveToStorage();
        this._fetchingData.next(false);
      },
      err => {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.error(err);
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      }
    );
  };
  // updateAllFeeds(): void {
  //   this._getFeeds().
  // }
  addNewFeed(newFeedURL: string): void {
    const feeds = this._getFeeds();
    if (!feeds.find(feed => feed.url === newFeedURL)) {
      feeds.push(new Feed(newFeedURL));
      this.activateFeed(newFeedURL);
      this.updateActiveFeed();
      this._saveToStorage();
    }
  };

  _getFeeds() {
    const feeds = this._feeds.getValue() || [];
    return feeds;
  };
  _getActiveFeedUrl() {
    let activeFeedUrl = this._activeFeedUrl && this._activeFeedUrl.getValue();
    if (!activeFeedUrl) {
      const feeds = this._getFeeds();
      activeFeedUrl = feeds && feeds[0] && feeds[0].url;
    }
    return activeFeedUrl;
  }
  _getActiveFeed() {
    const feeds = this._getFeeds();
    const activeFeedUrl = this._activeFeedUrl.getValue();
    const activeFeed = activeFeedUrl && feeds.find(feed => feed.url === activeFeedUrl) || feeds[0];
    return activeFeed;
  };
  _getItems() {
    const activeFeed = this._getActiveFeed();
    const items = activeFeed && activeFeed.items;
    return items;
  };
  _getActiveItemGuid() {
    const activeFeed = this._getActiveFeed();
    const activeItemGuid = activeFeed && activeFeed.items && (activeFeed.activeItemGuid || (activeFeed.items[0] && activeFeed.items[0].guid));
    return activeItemGuid;
  };
  _getItem(guid) {
    const items = this._getItems();
    const item = items && items.find(item => item.guid === guid);
    return item;
  };
  _getactiveItem() {
    const items = this._getItems();
    const activeItem = items && items.find(item => item.guid === this._activeItemGuid.getValue());
    return activeItem;
  };
  _getTextDescription(): string {
    const activeItem = this._getactiveItem();
    const description = activeItem && activeItem.description;
    const el = document.createElement('div');
    el.innerHTML = description;
    const textDescription = description && el.innerText;
    return textDescription;
  };
  _saveToStorage() {
    this._storage.set('data', {feeds: this._getFeeds(), activeFeedUrl: this._activeFeedUrl.getValue()});
  };
  _loadFromStorage(): any {
    return this._storage.get('data');
  }
  _loadFeedsFromStorage(): Feed[] {
    const loaded = this._loadFromStorage();
    const feeds = loaded && loaded.feeds;
    return feeds;
  }
  _loadActiveFeedUrlFromStorage(): string {
    const loaded = this._loadFromStorage();
    const activeFeedUrl = loaded && loaded.activeFeedUrl;
    return activeFeedUrl;
  }
}
