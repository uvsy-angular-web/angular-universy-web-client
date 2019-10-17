import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Routes} from './routes.enum';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  constructor(private router: Router) {
  }

  public navigateToInstitutionPage() {
    this.navigateToRoute(Routes.INSTITUTION);
  }

  public navigateToCareerPage() {
    this.navigateToRoute(Routes.CAREER);
  }

  public navigateToProgramPage() {
    this.navigateToRoute(Routes.PROGRAM);
  }

  public navigateToSubjectPage() {
    this.navigateToRoute(Routes.SUBJECT);
  }

  public navigateToCoursePage() {
    this.navigateToRoute(Routes.COURSE);
  }

  private navigateToRoute(route: Routes) {
    this.router.navigate([route]);
  }
}

