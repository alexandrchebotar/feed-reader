import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Feed, Item } from './data.service';

const CONFIG = {
  rss2jsonUrl: 'https://api.rss2json.com/v1/api.json',
  api_key: 'zeeabuj2tk5afeaijbnkkfppmh0o7s2nsijzzzvz',
  count: 50,
}
export class FetchError {
  constructor(public url: string, public message: string) {};
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private history: {count: number; lastTimeUrlFetch: any[]} = {count: 0, lastTimeUrlFetch: []};
  constructor(private _http: HttpClient) { } 
  fetchFeed(url: string): Observable<Feed> {
    if (this.history.count > 24) {
      throw new Error(`Service rss2json allows maximum 25 feeds in free account. Visit site https://rss2json.com/plans and get paied plan or just create new free API-key and keep up to 25 feeds in your subscribe.`);
    }
    const lastTimeUrlFetch: number = this.history.lastTimeUrlFetch[url];
    if (lastTimeUrlFetch) {
      const ninetyMinutes = 1.5 * 60 * 60 * 1000;
      const wait = lastTimeUrlFetch + ninetyMinutes - Date.now();
      if (wait > 0) {
        throw new Error(`Service rss2json update feeds once per 90 minutes in free account. Visit site https://rss2json.com/plans to get more information.`);
      }
    }
    const {rss2jsonUrl, api_key, count} = CONFIG
    const request = `${rss2jsonUrl}?rss_url=${url}&api_key=${api_key}&count=${count}`;
    return this._http.get(request).pipe(map((res: any) => {
      const {status, feed: {url, title: name}, items} = res;
      if (status !== 'ok') {
        throw new Error(`Feed convertation error. Please chech is url ${url} valid RSS/Atom feed link. Or visit site https://rss2json.com and chech is service active now.`);
      }
      if (!lastTimeUrlFetch) {
        this.history.count++;
      }  
      this.history.lastTimeUrlFetch[url] = Date.now;
      return new Feed(url, name, items.map(item => new Item(item)));
    }),
    catchError(err => {
      return throwError(`Error: can't fetch data from server while fetching RSS/Atom feen from ${url}. ${err.message}`);
    }));
  }

}
