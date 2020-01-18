import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Route} from './routes/routes.enum';

const URL_SEPARATOR = '/';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {
  }

  public navigateToProgramStats() {
    this.navigateToRoute(Route.PROGRAM_STATS);
  }

  public navigateToHomePage() {
    this.navigateToRoute(Route.HOME);
  }
  public navigateToInstitutionPage() {
    this.navigateToRoute(Route.INSTITUTION);
  }

  public navigateToCareerPage() {
    this.navigateToRoute(Route.CAREER);
  }

  public navigateToProgramPage() {
    this.navigateToRoute(Route.PROGRAM);
  }

  public navigateToSubjectPage() {
    this.navigateToRoute(Route.SUBJECT);
  }

  public navigateToCoursePage() {
    this.navigateToRoute(Route.COURSE);
  }

  public navigateToPreviousPage() {
    const currentPath = this.router.url;
    const previousPath = NavigationService.getPreviousPath(currentPath);
    this.router.navigateByUrl(previousPath);
  }

  public isRouteCurrentOne(route: Route) {
    const currentPath = this.router.url as Route;
    return currentPath === `/${route}`;
  }

  private navigateToRoute(route: Route) {
    this.router.navigate([route]);
  }

  private static getPreviousPath(currentPath) {
    const arrayCurrentPath = currentPath.split(URL_SEPARATOR);
    arrayCurrentPath.pop();
    return arrayCurrentPath.join(URL_SEPARATOR);
  }
}

