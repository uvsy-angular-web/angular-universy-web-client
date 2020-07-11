import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemConfigService } from './system/system-config.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Course } from '../../models/course.model';
import { SubjectService } from './subject.service';
import { LocalStorageService } from './local-storage.service';
import { Subject } from '../../models/subject.model';
import { Endpoint } from 'src/app/models/endpoint.model';
import { EndpointName } from 'src/app/shared/enums/endpoint-name.enum';
import { CRUDEndpointsService } from './system/crud-endpoints.service';
import { ModalService } from 'src/app/modals/modal.service';
import { Commission } from 'src/app/models/commission.model';

const ENDPOINT_COURSES = '/universy/institution/courses';
const CURRENT_COURSE_KEY = 'current-course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private endpoint = new Endpoint(EndpointName.COURSES, EndpointName.SUBJECT);

  constructor(
    private crudEndpointService: CRUDEndpointsService,
    private notificationService: ModalService) {
  }

  getCourses(subject?: Subject): Observable<Course[]> {
    const parentId = subject ? subject.id : this.getParentId();

    return this.crudEndpointService.getAllFromParent(parentId, this.endpoint);
  }

  addCourse(commission: Commission, subject?: Subject) {
    const parentId = subject ? subject.id : this.getParentId();
    const body = { commissionId: commission.id };

    return this.crudEndpointService.createOnParent(parentId, this.endpoint, body);
  }

  updateCourse(course: Course) {
    return this.crudEndpointService.update(this.endpoint, course.courseId, course);
  }

  deleteCourse(course: Course) {
    return this.crudEndpointService.delete(this.endpoint, course.courseId);
  }

  private getParentId(): string {
    return SubjectService.getCurrentSubject().id;
  }

  public static setCurrentCourse(course: Course) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_COURSE_KEY, course);
  }

  public static getCurrentCourse(): Course {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_COURSE_KEY) as Course;
  }
}
