import { Meal } from './';

export class MealSaveRequest {
  public id: number;
  public mealTime: Date;
  public calorieValue: number;
  public description: string;

  constructor(){}

  static ofMeal(meal: Meal) :MealSaveRequest {
    let mealRequest: MealSaveRequest = new MealSaveRequest();
    mealRequest.id = meal.id;
    mealRequest.mealTime = meal.mealTime;
    mealRequest.calorieValue = meal.calorieValue;
    mealRequest.description = meal.description;
    return mealRequest;
  }

  toRequestJson() :any{
    let req: any =  {
    mealTime : this.mealTime.toISOString(),
    calorieValue : this.calorieValue,
    description : this.description}
    return req;
  }
}
