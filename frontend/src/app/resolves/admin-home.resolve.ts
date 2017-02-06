import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
   ActivatedRouteSnapshot} from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { UserCrudService } from '../services';
import { UserAdminHomeComponent } from '../components';
import { Meal, PaginatedData } from '../models';

@Injectable()
export class AdminHomeResolve implements Resolve<PaginatedData> {

  constructor(private userCrudService: UserCrudService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedData> {
    return this.userCrudService.getAllUsers( 0, UserAdminHomeComponent.PAGE_SIZE);
  }
}
