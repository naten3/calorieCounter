import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpUtils } from '../common';
import { UserService } from './'
import { User, Meal, PaginatedData } from '../models'

@Injectable()
export class MealService implements OnInit {

  private baseUrl :string = "/api";

  private loginSubject: BehaviorSubject<User>

  constructor(private http: Http, private userService: UserService) {}

  ngOnInit() {
  }

  public getUserMeals(userId: number, page: number, pageSize: number) :Observable<PaginatedData> {
    let headers: Headers = this.userService.getAuthHeader();
    let params: URLSearchParams = HttpUtils.getPageParams(page, pageSize);
    return this.http.get(`${this.baseUrl}/users/${userId}/meals`, {
      headers : headers,
      search: params }).map(res => {
          return new PaginatedData(res.json(), Meal);
      });
        //TODO error handling
  }

}
