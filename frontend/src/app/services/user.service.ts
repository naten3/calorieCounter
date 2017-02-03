import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models'

@Injectable()
export class UserService implements OnInit{
  private USER_LOCAL_KEY: string = "USER";
  private X_AUTH_HEADER: string = "x-auth-header";
  private baseUrl :string = "localhost:8080/";
  private loginObservable: Observable<boolean> = new Observable<boolean>();
  private loginSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    let user: User = this.loginSubject.value;
    if (user == null) {
      let storageUser  = JSON.parse(localStorage.getItem(this.USER_LOCAL_KEY));
      if (storageUser != null) {
        this.checkValidSession(storageUser).subscribe(sessionValid => {
          if (sessionValid) {
            this.loginSubject.next(storageUser);
          }
        });
      }
    }
  }

  private checkValidSession(user: User) :Observable<boolean>{
    return this.http.get(`${this.baseUrl}/login-health` ,{ headers : this.authHeaders(user) })
    .map(res => res.status == 200);
  }

  login(username: string, password: string) :Observable<boolean> {
    const body = new URLSearchParams();
    body.set("username", username);
    body.set("password", password);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${this.baseUrl}/login`, body.toString(), {
      headers : headers }).map(res => {
        if (res.status == 200) {
          let token: string = res.headers.get(this.X_AUTH_HEADER);
          let responseUser: User = res.json();
          responseUser.setToken(token);
          localStorage.setItem( this.USER_LOCAL_KEY, JSON.stringify(responseUser));
          this.loginSubject.next(responseUser);
          return true;
        } else {
          return false;
        }
      });
    }

  private logout(hitEndpoint?: boolean) {
    let user: User = this.loginSubject.value;
    if (user != null) {
      if (hitEndpoint == undefined || hitEndpoint) {
        this.http.post(`${this.baseUrl}/logout`, null,  {
        headers : this.authHeaders(user) });
      }
      localStorage.removeItem(this.USER_LOCAL_KEY)
      this.loginSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

  private authHeaders(user: User) :Headers {
    let headers = new Headers();
    headers.append(this.X_AUTH_HEADER, user.getToken());
    return headers;
  }

  public getLoginObservable() :Observable<User> {
    return this.loginSubject.asObservable();
  }

}
