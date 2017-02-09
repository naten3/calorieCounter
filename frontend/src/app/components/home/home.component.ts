import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService, UserService } from '../../services';
import { Meal, PaginatedData, MealSaveRequest, TimeRange } from '../../models';
import { MealSaveAction, MealActionType } from '../../actions';
import { AddUpdateMealComponent } from './';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public static PAGE_SIZE: number = 4;
  userId: number;
  mealPage: PaginatedData;
  loadingPage: boolean = false;
  userSave: EventEmitter<MealSaveAction>;

  @ViewChild('addUpdateMeal') addUpdateMealComponent: AddUpdateMealComponent;

  constructor(private route: ActivatedRoute, private mealService: MealService) {}

  ngOnInit() {
    this.mealPage = this.route.snapshot.data['meals'];
    this.userId = this.route.snapshot.params['userId'];
  }

  getPage(): number {
    return this.mealPage.number + 1;
  }

  nextPage() {
    this.updatePage(this.mealPage.number + 1);
  }

  previousPage() {
    this.updatePage(this.mealPage.number - 1);
  }

  updatePage(newPage: number) {
    this.mealService.getUserMeals(this.userId, newPage, HomeComponent.PAGE_SIZE).subscribe( mealPage => {
      this.mealPage = mealPage;
    })
  }

  createMealModal() {
    this.addUpdateMealComponent.showModal(new MealSaveRequest(), MealActionType.CREATE);
  }

  updateMealModal(m: Meal) {
    let mealRequest: MealSaveRequest = new MealSaveRequest();
    mealRequest.id = m.id;
    mealRequest.description = m.description;
    mealRequest.mealTime = m.mealTime;
    mealRequest.calorieValue = m.calorieValue;

    this.addUpdateMealComponent.showModal(mealRequest, MealActionType.UPDATE);
  }

  handleSaveRequest(m: MealSaveAction) {
    if (m.action == MealActionType.CREATE) {
      this.mealService.createMeal(this.userId, m.mealSaveRequest).subscribe( meal => {
        this.addUpdateMealComponent.mealSaveSucceded();
        this.updatePage(this.mealPage.number);
      });
    } else {
      this.mealService.updateMeal(this.userId, m.mealSaveRequest).subscribe( meal => {
        this.addUpdateMealComponent.mealSaveSucceded();
        for ( let i = 0; i < this.mealPage.items.length ; i++) {
          if (this.mealPage.items[i].id == meal.id) {
            this.mealPage.items[i] = meal;
            break;
          }
        }
      });
    }
  }

  public filterMeals(timeRange: TimeRange) {
    this.mealService.getUserMealsInDateRange(this.userId, timeRange.startTime, timeRange.endTime, 0, HomeComponent.PAGE_SIZE).subscribe( mealPage => {
      this.mealPage = mealPage;
    })
  }

}
