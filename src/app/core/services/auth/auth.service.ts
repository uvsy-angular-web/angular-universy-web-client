import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { NavigationService } from '../system/navigation.service';
import { LocalStorageService } from '../local-storage.service';
import { CURRENT_USER_KEY } from './constants/auth.constants';
import { InstitutionService } from '../institution.service';


@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService,
    private institutionService: InstitutionService,
  ) {
  }

  login(user: User) {
    // TODO: call the login method and save the token in the user
    if (user) {
      AuthService.setCurrentUser(user);
      this.institutionService.setDefaultInstitution();
    }
  }

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);

    this.navigationService.navigateToHomePage();
  }

  public static isLoggedIn() {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_USER_KEY);
  }

  private static setCurrentUser(user: User) {
    LocalStorageService.saveObjectInLocalStorage(CURRENT_USER_KEY, user);
  }

  public static getCurrentUser(): User {
    return LocalStorageService.getObjectFromInLocalStorage(CURRENT_USER_KEY) as User;
  }
}
