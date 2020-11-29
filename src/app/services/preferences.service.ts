import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string, defaultValue: string): string {
    let value = localStorage.getItem(key);
    if (value === null) {
      value = defaultValue;
    }
    return value;
  }
}
