import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) {
  }

  getClasses() {
    return this.http.get('/api/classes');
  }

}
