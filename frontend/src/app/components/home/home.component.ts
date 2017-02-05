import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService, UserService } from '../../services';
import { Meal, PaginatedData, MealSaveRequest } from '../../models';
import { MealSaveAction, MealActionType } from '../../actions';
import { AddUpdateMealComponent } from './';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public static PAGE_SIZE: number = 2;
  page: number = 0;
  mealPage: PaginatedData;
  loadingPage: boolean = false;

  @ViewChild('addUpdateMeal') addUpdateMealComponent: AddUpdateMealComponent;

  constructor(private route: ActivatedRoute, private mealService: MealService,
     private userService: UserService) {}

  ngOnInit() {
    this.mealPage = this.route.snapshot.data['meals'];
  }

  getPage(): number {
    return this.mealPage.number + 1;
  }

  hasNextPage() :boolean {
    return this.mealPage.number < this.mealPage.totalPages - 1;
  }

  hasPreviousPage() :boolean {
    return this.mealPage.number > 0;
  }

  nextPage() {
    this.updatePage(this.mealPage.number + 1);
  }

  previousPage() {
    this.updatePage(this.mealPage.number - 1);
  }

  updatePage(newPage: number) {
    this.mealService.getUserMeals(this.userService.getUser().getId(), newPage, HomeComponent.PAGE_SIZE).subscribe( mealPage => {
      this.mealPage = mealPage;
    })
  }

  createMeal() {
    let meal: Meal = new Meal();
    meal.description = '';
    meal.calorieValue = null;
    this.addUpdateMealComponent.showModal(new MealSaveRequest(), MealActionType.CREATE);
  }

}
