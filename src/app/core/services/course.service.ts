import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigService } from './system/system-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../../models/course.model';
import { SubjectService } from './subject.service';
import { LocalStorageService } from './local-storage.service';
import { Subject } from '../../models/subject.model';

const ENDPOINT_COURSES = '/universy/institution/courses';
const CURRENT_COURSE_KEY = 'current-course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private systemConfigService: SystemConfigService) {
  }

  getCourses(): Observable<Course[]> {
    const currentSubject = SubjectService.getCurrentSubject();
    return this.getCoursesBySubject(currentSubject);
  }

  getCoursesBySubject(subject: Subject): Observable<Course[]> {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('subjectCode', subject.codename.toString());

    return this.http.get(baseUrl + ENDPOINT_COURSES, { headers, params })
      .map((data: any) => {
        return data.courses;
      }
      );
  }


  addCourse(courseName: string) {
    const body = {
      subjectCode: SubjectService.getCurrentSubject().codename,
      active: true,
      name: courseName,
      periods: [],
    };
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.put(baseUrl + ENDPOINT_COURSES, body, { headers });
  }

  updateCourse(course: Course) {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();
    return this.http.post(baseUrl + ENDPOINT_COURSES, course, { headers });
  }

  deleteCourse(course: Course) {
    const baseUrl = this.getBaseUrl();
    const headers = this.getHeaders();
    const currentSubject = SubjectService.getCurrentSubject();
    const params = new HttpParams()
      .set('courseCode', course.courseCode.toString())
      .set('subjectCode', currentSubject.codename);
    return this.http.delete(baseUrl + ENDPOINT_COURSES, { headers, params });
  }

  private getHeaders() {
    return this.systemConfigService.getHeaders();
  }

  private  getBaseUrl() {
    return this.systemConfigService.getBaseUrl();
  }

  public static setCurrentCourse(course: Course) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_COURSE_KEY, course);
  }

  public static getCurrentCourse(): Course {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_COURSE_KEY) as Course;
  }
}
