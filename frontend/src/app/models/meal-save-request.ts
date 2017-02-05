import { Meal } from './';

export class MealSaveRequest {
  public mealTime: string;
  public calorieValue: number;
  public description: string;

  constructor(){}

  static ofMeal(meal: Meal) :MealSaveRequest {
    let mealRequest: MealSaveRequest = new MealSaveRequest();
    meal.mealTime = meal.mealTime;
    meal.calorieValue = meal.calorieValue;
    meal.description = meal.description;
    return mealRequest;
  }
}
