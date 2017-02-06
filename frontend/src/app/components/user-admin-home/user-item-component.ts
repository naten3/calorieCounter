import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from "../../models";

@Component({
  selector: 'cc-user-item',
  template:
  `<div class="card" style="width: 20rem;">
     <div class="card-block">
       <h4 class="card-title">{{user.description}}</h4>
        <dl>
          <dt>Username:</dt>
          <dd>{{user.username}}</dd>
          <dt>Preferred Calorie Count</dt>
          <dd>{{user.desiredCalories}}</dd>
        </dl>
     <a (click)="updateUserRequest()" class="btn btn-primary">Edit</a>
    </div>
  </div>`,
  styleUrls: []
})

export class UserItemComponent {
  @Input() user: User;
  @Output('updateUse') updateUserEmitter: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  updateUserRequest() {
    this.updateUserEmitter.emit(this.user);
  }

}
