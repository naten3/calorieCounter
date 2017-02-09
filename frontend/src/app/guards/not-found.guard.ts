import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models';
import { UserService } from '../services';
import { LoginGuard } from './';

/**
This is similar to auth guard but routes user to home if they try to visit the login page
*/
@Injectable()
export class NotFoundGuard implements CanActivate, OnDestroy {

  private loggedIn: boolean;
  private loginSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.loginSubscription = userService.getLoginObservable().subscribe(user => {
      this.loggedIn = (user != null);
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean> {
    return this.userService.checkMemoryLoggedInObservable().map( user => {
      let path: string;
      if (user == null) {
        path = "login"
      } else {
        path = LoginGuard.getUserHome(user);
      }
      this.router.navigate([path]);
      return false;
    });
  }

  public static getUserHome(user: User) :string {
    for (let role of user.roles) {
      if (role == User.USER_ADMIN_ROLE || role == User.ADMIN_ROLE) {
        return `admin/all-users`;
      }
      if (role == User.USER_ROLE) {
        return `user/${user.id}/meals`;
      }
      return '';
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
