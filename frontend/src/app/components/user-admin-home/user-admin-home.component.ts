import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCrudService, UserService } from '../../services';
import { User, PaginatedData, MealSaveRequest } from '../../models';
import { UserSaveAction, UserActionType } from '../../actions';
import { AddUpdateUserComponent } from './';

@Component({
  templateUrl: './user-admin-home.component.html'
})
export class UserAdminHomeComponent implements OnInit {
  public static PAGE_SIZE: number = 4;
  page: number = 0;
  userPage: PaginatedData;
  loadingPage: boolean = false;
  userSave: EventEmitter<UserSaveAction>;

//@ViewChild('addUpdateUser') addUpdateMealComponent: AddUpdateUserComponent;

  constructor(private route: ActivatedRoute, private userCrudService: UserCrudService,
     private userService: UserService) {}

  ngOnInit() {
    this.userPage = this.route.snapshot.data['users'];
  }

  getPage(): number {
    return this.userPage.number + 1;
  }

  hasNextPage() :boolean {
    return this.userPage.number < this.userPage.totalPages - 1;
  }

  hasPreviousPage() :boolean {
    return this.userPage.number > 0;
  }

  nextPage() {
    this.updatePage(this.userPage.number + 1);
  }

  previousPage() {
    this.updatePage(this.userPage.number - 1);
  }

  updatePage(newPage: number) {
    this.userCrudService.getAllUsers( newPage, UserAdminHomeComponent.PAGE_SIZE).subscribe( userPage => {
      this.userPage = userPage;
    })
  }

  createUserModal() {
    //this.addUpdateMealComponent.showModal(new MealSaveRequest(), MealActionType.CREATE);
  }

  updateUserModal(u: User) {
    //let mealRequest: MealSaveRequest = new MealSaveRequest();
    //mealRequest.id = m.id;
    //mealRequest.description = m.description;
    //mealRequest.mealTime = m.mealTime;
    //mealRequest.calorieValue = m.calorieValue;

    //this.addUpdateMealComponent.showModal(mealRequest, MealActionType.UPDATE);
  }

  handleSaveRequest(u: UserSaveAction) {
    /*if (m.action == MealActionType.CREATE) {
      this.mealService.createMeal(this.userService.getUser().id, m.mealSaveRequest).subscribe( meal => {
        this.addUpdateMealComponent.mealSaveSucceded();
        this.updatePage(this.mealPage.number);
      });
    } else {
      this.mealService.updateMeal(this.userService.getUser().id, m.mealSaveRequest).subscribe( meal => {
        this.addUpdateMealComponent.mealSaveSucceded();
        for ( let i = 0; i < this.mealPage.items.length ; i++) {
          if (this.mealPage.items[i].id == meal.id) {
            this.mealPage.items[i] = meal;
            break;
          }
        }
      });
    }*/ return new UserSaveAction(null, null);
  }

}
