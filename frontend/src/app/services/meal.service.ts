import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { HttpUtils } from '../common';
import { UserService } from './'
import { User, Meal, MealSaveRequest, PaginatedData } from '../models'
import { DateUtils } from '../common'

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

/**
  takes UTC dates
*/
  public getUserMealsInDateRange(userId: number, startDate: Date, endDate: Date, page: number, pageSize: number) :Observable<PaginatedData> {
    let headers: Headers = this.userService.getAuthHeader();
    let params: URLSearchParams = HttpUtils.getPageParams(page, pageSize);
    params.set('startTime', DateUtils.getUTCDateString(startDate));
    params.set('endTime', DateUtils.getUTCDateString(endDate));
    return this.http.get(`${this.baseUrl}/users/${userId}/meals`, {
      headers : headers,
      search: params }).map(res => {
          return new PaginatedData(res.json(), Meal);
      });
        //TODO error handling
  }

  public updateMeal( userId: number, mealSaveRequest: MealSaveRequest) :Observable<Meal>{
    let headers: Headers = this.userService.getAuthHeader();
    let body: any = mealSaveRequest.toRequestJson();
    return this.http.put(`${this.baseUrl}/users/${userId}/meals/${mealSaveRequest.id}`, body ,
    {headers : headers}).map(res => {
          return new Meal(res.json());
      });
  }

  public createMeal( userId: number, mealSaveRequest: MealSaveRequest) :Observable<Meal>{
    let headers: Headers = this.userService.getAuthHeader();
    let body: any = mealSaveRequest.toRequestJson();
    return this.http.post(`${this.baseUrl}/users/${userId}/meals`, body ,
    {headers : headers}).map(res => {
          return new Meal(res.json());
      });
  }

}
