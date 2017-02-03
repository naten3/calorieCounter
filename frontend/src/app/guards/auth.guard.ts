import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  private loggedIn: boolean;
  private logginSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.logginSubscription = userService.getLoginObservable().subscribe(user => {
      console.log("user is not logged in")
      this.loggedIn = (user != null);
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loggedIn) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.logginSubscription.unsubscribe();
  }
}
