import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isSupported) {
      return JSON.parse(this.localStorage.getItem(key) || '{}');
    }

    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isSupported) {
      this.localStorage.removeItem(key);

      return true;
    }

    return false;
  }

  /* Verify browser support for local storage */
  get isSupported(): boolean {
    return !!this.localStorage;
  }
}
