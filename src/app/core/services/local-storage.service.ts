import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public static saveObjectInLocalStorage(key: string, object: any) {
    if (key && object) {
      const objectToString = JSON.stringify(object);
      localStorage.setItem(key, objectToString);
    } else {
      console.error('Error trying to save an object in localStorage with empty values');
    }
  }

  public static getObjectFromInLocalStorage(key: string): any {
    if (key) {
      const stringObject = localStorage.getItem(key);
      return JSON.parse(stringObject);
    } else {
      console.error('Error trying to get an object from localStorage with empty key');
    }
  }

}
