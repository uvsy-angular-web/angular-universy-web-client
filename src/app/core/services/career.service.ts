import {Injectable} from '@angular/core';
import {Career} from '../../shared/models/career.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private careerSource = new BehaviorSubject<Career>(new Career());
  public currentCareer = this.careerSource.asObservable();

  constructor() {
  }


  public updateCareer(career: Career) {
    this.careerSource.next(career);
  }


}
