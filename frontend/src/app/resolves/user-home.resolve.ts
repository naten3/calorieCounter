import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
   ActivatedRouteSnapshot} from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { MealService } from '../services';
import { HomeComponent } from '../components';
import { Meal, PaginatedData } from '../models';

@Injectable()
export class UserHomeResolve implements Resolve<PaginatedData> {

  constructor(private mealService: MealService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedData> {
    let userId: number = route.params['userId'];
    return this.mealService.getUserMeals(userId, 0, HomeComponent.PAGE_SIZE);
  }
}
