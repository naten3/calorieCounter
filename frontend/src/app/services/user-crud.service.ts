import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UserService} from './';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { User, PaginatedData } from '../models'
import { HttpUtils } from '../common'

@Injectable()
export class UserCrudService {
  private baseUrl :string = "/api";

  constructor(private http: Http, private router: Router, private userService: UserService) { }

  getAllUsers(page: number, pageSize: number) :Observable<PaginatedData>{
    let headers: Headers = this.userService.getAuthHeader();
    let params: URLSearchParams = HttpUtils.getPageParams(page, pageSize);
    return this.http.get(`${this.baseUrl}/admin/users`, {
      headers : headers,
      search: params }).map(res => {
        return new PaginatedData(res.json(), User);
      });
      //TODO error handling
  }

  searchByUsername() {

  }

}