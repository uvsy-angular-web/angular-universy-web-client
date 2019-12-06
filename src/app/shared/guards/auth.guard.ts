import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {NavigationService} from '../../core/services/system/navigation.service';
import {CURRENT_USER_KEY} from '../../core/services/auth/constants/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private navigationService: NavigationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (AuthGuard.isLoggedIn()) {
      return true;
    }
    this.navigationService.navigateToHomePage();
    return false;
  }

  public static isLoggedIn() {
    return localStorage.getItem(CURRENT_USER_KEY);
  }
}

