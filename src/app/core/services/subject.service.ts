import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SystemConfigService} from './config/system-config.service';
import {HttpClient} from '@angular/common/http';
import {InstitutionService} from './institution.service';
import {Subject} from '../../shared/models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService,
              private institutionService: InstitutionService) {
  }
  private subjectSource = new BehaviorSubject<Subject>(new Subject());
  public currentSubject = this.subjectSource.asObservable();

  public setCurrentCareer(subject: Subject) {
    this.subjectSource.next(subject);
  }

  public getCurrentCareer(): Subject {
    let career;
    this.currentSubject
      .subscribe((serviceCareer) => career = serviceCareer);
    return career;
  }


  private _getHeaders() {
    return this.systemConfigService.getHeader();
  }
  private static _getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
