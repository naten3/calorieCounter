import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services";
import { LoginGuard } from "../../guards";
import { User } from "../../models";

@Component({
  selector: 'cc-user-item',
  template:
  `<div class="card" style="width: 20rem;">
     <div class="card-block">
       <h4 class="card-title">{{user.username}}</h4>
        <dl>
          <dt>Email:</dt>
          <dd>{{user.email}}</dd>
          <dt>Preferred Calorie Count:</dt>
          <dd>{{user.desiredCalories}}</dd>
        </dl>
     <a (click)="updateUserRequest()" class="btn btn-primary">Edit</a>
     <a (click)="deleteUser()" class="btn btn-primary">Delete</a>
     <a *ngIf="isUserAdmin()" (click)="navigateToUserPage()" class="btn btn-primary">Edit Meals</a>
    </div>
  </div>`,
  styleUrls: []
})

export class UserItemComponent {
  @Input('user') user: User;
  @Output('updateUser') updateUserEmitter: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService, private router: Router) {}
  @Output('deleteUser') deleteUserEmitter: EventEmitter<number> = new EventEmitter<number>();

  private updateUserRequest() {
    this.updateUserEmitter.emit(this.user);
  }

  private  deleteUser() {
    this.deleteUserEmitter.emit(this.user.id);
  }

  private isUserAdmin() :boolean {
    let siteUser: User = this.userService.getUser()
    return siteUser.hasRole(User.USER_ADMIN_ROLE);
  }

  private navigateToUserPage() {
    this.router.navigate([LoginGuard.getUserHome(this.user)]);
  }

}
