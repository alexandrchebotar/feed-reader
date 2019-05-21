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
  constructor(public url: string, public name: string, public items?: Item[], public activeItemGuid?: string) {};
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _errors = new BehaviorSubject<string[]>([]);
  errors = this._errors.asObservable();
  private _feeds = new BehaviorSubject<Feed[]>( this._loadFromStorage().feeds ||
    [
      {url: 'https://nnmclub.to/forum/rssp.xml', name: 'NNM-Club', items: nnmClubFeed.items.map(item => new Item(item)) },
      {url: 'https://www.pravda.com.ua/rss/', name: 'Українська правда', items: pravdaFeed.items.map(item => new Item(item)), activeItemGuid: 'https://www.pravda.com.ua/news/2019/05/19/7215467/' },
      {url: 'https://pingvinus.ru/rss.xml', name: 'Пингвинус Linux', items: pingvinusFeed.items.map(item => new Item(item))},
      {url: 'https://www.reddit.com/.rss', name: 'reddit: the front page of the internet', items: redditFeed.items.map(item => new Item(item))},
    ]
  );
  feeds = this._feeds.asObservable();
  private _activeFeedUrl = new BehaviorSubject<string>(this._loadFromStorage().activeFeedUrl || this._feeds.getValue()[0].url);
  activeFeedUrl = this._activeFeedUrl.asObservable();
  private _activeFeed = new BehaviorSubject<Feed>(this._getActiveFeed());
  activeFeed = this._activeFeed.asObservable();
  private _items = new BehaviorSubject<Item[]>(this._getItems());
  items = this._items.asObservable();
  private _activeItemGuid = new BehaviorSubject<string>(this._getActiveItemGuid() || this._getItems()[0].guid);
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
    this._activeItemGuid.next(this._getActiveItemGuid() || this._getItems()[0].guid);
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
    this._http.fetchFeed(this._activeFeedUrl.getValue()).subscribe(
      res => {
        const feeds = this._feeds.getValue();
        const feed = feeds.find(feed => feed.url === res.url);
        let {url, name, items} = feed;
        const newItems = res.items.filter(newItem => !items.some(item => item.guid === newItem.guid));
        feed.items = [...newItems, ...items];
        // .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
        feed.name = name || res.name;
        this.activateFeed(url);
      },
      err => this._errors.next([err])
    );
  } 

  _getActiveFeed() {
    return this._feeds.getValue().find(feed => feed.url === this._activeFeedUrl.getValue());
  };
  _getItems() {
    return this._activeFeed.getValue().items;
  };
  _getItem(guid) {
    return this._getItems().find(item => item.guid === guid);;
  };
  _getActiveItemGuid() {
    return this._activeFeed.getValue().activeItemGuid;
  };
  _getactiveItem() {
    return this._items.getValue().find(item => item.guid === this._activeItemGuid.getValue())
  };
  _getTextDescription(): string {
    const description = this._activeItem.getValue().description;
    const el = document.createElement('div');
    el.innerHTML = description;
    return el.innerText;
  };
  _saveToStorage() {
    this._storage.set('data', {feeds: this._feeds.getValue(), activeFeedUrl: this._activeFeedUrl.getValue()});
  };
  _loadFromStorage(): {feeds: Feed[], activeFeedUrl: string} {
    return this._storage.get('data');
  }
}
