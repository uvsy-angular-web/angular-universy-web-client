import {Component} from '@angular/core';
import {NavigationService} from './core/services/system/navigation.service';
import {Route} from './core/services/system/routes/routes.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'universy-web';

  constructor(private navigationService: NavigationService) {
  }

  isHomePageActive(): boolean {
    return this.navigationService.isRouteCurrentOne(Route.HOME);
  }
}
