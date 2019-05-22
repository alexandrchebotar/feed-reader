import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set(item: string, data: any) {
    localStorage.setItem(item, JSON.stringify(data));
  }
  get(item: string) {
    return  JSON.parse(localStorage.getItem(item));
  }
}
