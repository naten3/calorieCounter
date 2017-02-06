import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models';
import { UserService } from '../services';

/**
This is similar to auth guard but routes user to home if they try to visit the login page
*/
@Injectable()
export class LoginGuard implements CanActivate, OnDestroy {

  private loggedIn: boolean;
  private loginSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.loginSubscription = userService.getLoginObservable().subscribe(user => {
      this.loggedIn = (user != null);
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean>{
    if (this.loggedIn) {
      return Observable.of(true);
    } else {
      return this.userService.checkMemoryLoggedInObservable().map( user => {
        if (user == null) {
          return true
        }
        this.routeToUserHome(user);
        return false;
      })
    }
  }

  routeToUserHome(user: User) {
    for (let role of user.roles) {
      if (role == User.USER_ROLE) {
        this.router.navigate([`user/${user.id}/meals`]);
        return;
      } else if (role == User.ADMIN_ROLE) {
//TODO
      } else if (role == User.USER_ADMIN_ROLE) {
//TODO
      }
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
