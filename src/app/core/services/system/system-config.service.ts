import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import configJson from '@config/config.json';
import { Observable } from 'rxjs';

const APPLICATION_JSON = 'application/json';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigService {
  constructor(private http: HttpClient) {
  }

  httpDelete(endpointName: string): Observable<any> {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();

    const url = baseUrl + endpointName;
    return this.http.delete(url, { headers });
  }

  httpPut(endpointName: string, body?: any): Observable<any> {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();

    const url = baseUrl + endpointName;
    return this.http.put(url, body, { headers });
  }

  httpPost(endpointName: string, body?: any): Observable<any> {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();

    const url = baseUrl + endpointName;
    return this.http.post(url, body, { headers });
  }

  httpGet(endpointName: string, params?: HttpParams): Observable<any> {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();

    const url = baseUrl + endpointName;
    return this.http.get(url, { headers, params })
      .map((response: any) => {
        return response.data;
      }
      );
  }

  getHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-type', APPLICATION_JSON);
    headers = headers.append('x-api-key', configJson.apiKey);
    return headers;
  }

  getBaseUrl(): string {
    return `${configJson.baseEndpoint}/${configJson.stage}`;

  }
}
