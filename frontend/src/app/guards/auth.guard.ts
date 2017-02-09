import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {

  private loggedIn: boolean;
  private endBeforeStart: boolean = false;
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
          this.router.navigate(['/login']);
          return false
        }
        return true;
      })
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
