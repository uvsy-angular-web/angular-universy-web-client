import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SystemConfigService} from './system/system-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Course} from '../../shared/models/course.model';
import {CareerService} from './career.service';
import {SubjectService} from './subject.service';
import {Subject} from '../../shared/models/subject.model';

const ENDPOINT_COURSES = '/universy/institution/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseSource = new BehaviorSubject<Course>(new Course());
  public currentCourse = this.courseSource.asObservable();

  constructor(private http: HttpClient,
              private systemConfigService: SystemConfigService,
              private subjectService: SubjectService) {
  }

  public setCurrentCourse(course: Course) {
    this.courseSource.next(course);
  }

  public getCurrentCourse(): Subject {
    let course;
    this.currentCourse
      .subscribe((serviceCourse) => course = serviceCourse);
    return course;
  }

  getCourses(): Observable<Course[]> {
    const baseUrl = CourseService.getBaseUrl();
    const headers = this.getHeaders();

    const currentSubject = this.subjectService.getCurrentSubject();
    const params = new HttpParams()
      .set('subjectCode', currentSubject.subjectCode.toString());

    return this.http.get(baseUrl + ENDPOINT_COURSES, {headers, params})
      .map((data: any) => {
          return data.courses;
        }
      );
  }

  addCourse(courseName: string) {
    const body = {
      subjectCode: this.subjectService.getCurrentSubject().subjectCode,
      active: true,
      name: courseName,
      periods: [],
    };
    const baseUrl = CourseService.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.put(baseUrl + ENDPOINT_COURSES, body, {headers});
  }

  private getHeaders() {
    return this.systemConfigService.getHeader();
  }

  private static getBaseUrl() {
    return SystemConfigService.getBaseUrl();
  }
}
