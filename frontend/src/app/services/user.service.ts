import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { User } from '../models'

@Injectable()
export class UserService {
  private USER_LOCAL_KEY: string = "USER";
  private X_AUTH_HEADER: string = "x-auth-token";
  private baseUrl :string = "/api";
  private loginObservable: Observable<boolean> = new Observable<boolean>();
  private loginSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: Http, private router: Router) { }

  checkMemoryLoggedInObservable() :Observable<User>{
    let user: User = this.loginSubject.value;
    if (user == null) {
      let storageUser  = JSON.parse(localStorage.getItem(this.USER_LOCAL_KEY));
      if (storageUser != null) {
        let memoryUser = new User(storageUser);
        memoryUser.token = storageUser.token;
        return this.checkValidSession(memoryUser).map(sessionValid => {
          if (sessionValid) {
            this.loginSubject.next(memoryUser);
            return memoryUser;
          } else {
            return null;
          }
        });
      }
      else {
        return Observable.of(null);
      }
    } else {
      return Observable.of(user);
    }
  }

  private checkValidSession(user: User) :Observable<boolean>{
    return this.http.get(`${this.baseUrl}/session-health` ,{ headers : this.authHeaders(user) })
    .map(res => res.status == 200).catch( error => {
      return Observable.of(false);
    });;
  }

  login(username: string, password: string) :Observable<User> {
    const body = new URLSearchParams();
    body.set("username", username);
    body.set("password", password);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(`${this.baseUrl}/login`, body.toString(), {
      headers : headers }).map(res => {
        if (res.status == 200) {
          let token: string = res.headers.get(this.X_AUTH_HEADER);
          let responseUser: User = new User(res.json());
          responseUser.token = token;
          localStorage.setItem( this.USER_LOCAL_KEY, JSON.stringify(responseUser));
          this.loginSubject.next(responseUser);
          return responseUser;
        } else {
          return null;
        }
      }).catch( error => {
        if (error.status === 401) {
          return Observable.of(null);
        } else {
          return Observable.throw(error);
        }
      });
  }

  public logout(hitEndpoint?: boolean) {
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
    headers.append(this.X_AUTH_HEADER, user.token);
    return headers;
  }

  public getLoginSubject() :BehaviorSubject<User> {
    return this.loginSubject;
  }

  public getAuthHeader() :Headers{
    return this.authHeaders(this.loginSubject.value);
  }

  public getUser(): User {
    return this.loginSubject.value;
  }

  public getLoginObservable() :Observable<User> {
    return this.loginSubject.asObservable();
  }

  public getLoginStatusObservable() :Observable<boolean> {
    return this.loginSubject.asObservable().map(user => {return user != null});
  }

}
