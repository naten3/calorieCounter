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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {}

    login() {
        this.loading = true;
        this.userService.login(this.model.username, this.model.password).subscribe(
                loggedIn => {
                    if ( loggedIn ) {
                      console.log("Logged in!")
                      this.router.navigate(["home"]);
                    }
                });
    }
}
