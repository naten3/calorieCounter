import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AddUpdateUserComponent } from '../../components';
import { UserService, UserCrudService } from '../../services';
import { LoginGuard } from '../../guards';
import { UserSaveAction, UserActionType } from '../../actions';
import { UserSaveRequest, UserCreateRequest } from '../../models';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    invalidLoginAttempt: boolean = false;

    @ViewChild('addUpdateUser') addUpdateUserComponent: AddUpdateUserComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private userCrudService: UserCrudService) { }

    ngOnInit() {}

    login() {
        this.loading = true;
        this.userService.login(this.model.username, this.model.password).subscribe(
                user => {
                    this.loading = false;
                    this.invalidLoginAttempt = user == null;
                    if ( user != null ) {
                      this.router.navigate([LoginGuard.getUserHome(user)]);
                    }
                });
    }

    register() {
      this.addUpdateUserComponent.showModal(new UserSaveRequest(), UserActionType.CREATE);
    }

    handleRegistrationRequest(u: UserSaveAction) {
      let userCreateRequest :UserCreateRequest = new UserCreateRequest(u.userSaveRequest);
      this.userCrudService.createUser(userCreateRequest).subscribe( user => {
        this.addUpdateUserComponent.userSaveSucceded();
      });
    }
}
