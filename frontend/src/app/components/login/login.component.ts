import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../services';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    invalidLoginAttempt: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {}

    login() {
        this.loading = true;
        this.userService.login(this.model.username, this.model.password).subscribe(
                user => {
                    this.loading = false;
                    this.invalidLoginAttempt = user == null;
                    if ( user != null ) {
                      this.router.navigate([`user/${user.id}/meals`]); //TODO make constnat template instead of this
                    }
                });
    }
}
