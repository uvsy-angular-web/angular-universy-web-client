import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import configJson from '@config/config.json';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {
  readonly APPLICATION_JSON = 'application/json';


  constructor() {
  }

  public static getBaseUrl(): string {
    return `${configJson.baseEndpoint}/${configJson.stage}`;
  }

  public getHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-type', this.APPLICATION_JSON);
    headers = headers.append('x-api-key', configJson.apiKey);
    return headers;
  }

}

