import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Routes} from './routes/routes.enum';

const URL_SEPARATOR = '/';

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

  public navigateToPreviousPage() {
    const currentPath = this.router.url;
    const previousPath = NavigationService.getPreviousPath(currentPath);
    this.router.navigateByUrl(previousPath);
  }


  private navigateToRoute(route: Routes) {
    this.router.navigate([route]);
  }

  private static getPreviousPath(currentPath) {
    const arrayCurrentPath = currentPath.split(URL_SEPARATOR);
    arrayCurrentPath.pop();
    return arrayCurrentPath.join(URL_SEPARATOR);
  }
}

