export class Meal {

  public id: number;
  public userId: number;
  public mealTime: Date;
  public calorieValue: number;
  public description: string;

  constructor(source?: any){
    if (typeof source !== "undefined") {
      this.id = source.id
      this.userId = source.userId;
      this.mealTime = new Date(source.mealTime);
      this.calorieValue = source.calorieValue;
      this.description = source.description;
    }
  }

  clone() :Meal {
    let meal: Meal = new Meal();
    meal.id = this.id;
    meal.userId = this.userId;
    meal.mealTime = this.mealTime;
    meal.calorieValue = this.calorieValue;
    meal.description = this.description;
    return meal;
  }
}
