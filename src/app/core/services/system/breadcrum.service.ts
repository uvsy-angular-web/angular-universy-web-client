import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrum } from 'src/app/models/breadcrum.model';
import { CareerService } from '../career.service';
import { CourseService } from '../course.service';
import { InstitutionService } from '../institution.service';
import { ProgramService } from '../program.service';
import { SubjectService } from '../subject.service';
import { Route, routesBreadcrum } from './routes/routes.enum';

const URL_SEPARATOR = '/';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumService {

  constructor(private router: Router) {
  }

  public getCurrentLocations(): string[] {
    if (this.router.url) {
      return this.router.url.split(URL_SEPARATOR);
    }
    return [];
  }
  public getCurrentBreadcrums() {
    const locations = this.getCurrentLocations();
    const breadcrums = [...routesBreadcrum];
    if (locations) {
      breadcrums.forEach((breadcrum: BreadCrum) => {
        const locationBreadcrum = locations
          .find((location: string) => location === breadcrum.location);
        if (locationBreadcrum) {
          breadcrum.active = true;
          breadcrum.value = this.getBreadcrumValue(locationBreadcrum);
        } else {
          breadcrum.active = false;
          breadcrum.value = '';
        }
      });
    }
    return breadcrums;
  }

  private getBreadcrumValue(location: string): string {
    switch (location) {
      case 'institution':
        return InstitutionService.getCurrentInstitution().name;
      case 'career':
        return CareerService.getCurrentCareer().name;
      case 'program':
        return ProgramService.getCurrentProgram().name;
      case 'subject':
        return SubjectService.getCurrentSubject().name;
      case 'course':
        return CourseService.getCurrentCourse().commissionName;
    }
  }
}

