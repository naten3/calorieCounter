import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './services';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Calorie Counter';
  loginStatusObservable: Observable<boolean>
  subscription: Subscription;
  loggedIn: boolean = false;

  constructor(private userService: UserService) {
    this.loginStatusObservable = userService.getLoginStatusObservable();
  }

  private logout() {
    this.userService.logout();
  }

  ngOnInit() {
    this.subscription = this.loginStatusObservable.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
