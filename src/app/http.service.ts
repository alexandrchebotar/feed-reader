import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const CONFIG = {
  rss2jsonUrl: 'https://api.rss2json.com/v1/api.json',
  api_key: 'zeeabuj2tk5afeaijbnkkfppmh0o7s2nsijzzzvz',
  count: 50,
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { };

  fetchFeed(url: string): Observable<any> {
    const {rss2jsonUrl, api_key, count} = CONFIG
    const request = `${rss2jsonUrl}?rss_url=${url}&api_key=${api_key}&count=${count}`;
    return this._http.get(request).pipe(map((res: any) => {
      if (res.status !== 'ok') {
        // return Observable.throw(`Feed convertation error. Please chech is url ${url} valid RSS/Atom feed link. Or visit site https://rss2json.com and chech is service active now. Status: ${status}`);
        return Observable.throw(`${res.status}: ${res.message}`);
      }
      return res;
    }),
    catchError(err => {
      return throwError(`Error: can't fetch data from server while fetching RSS/Atom feen from ${url}. ${err.message}`);
    }));
  }
}
