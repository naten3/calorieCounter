import { MealSaveRequest } from '../models';
export enum MealActionType {
   UPDATE =1 ,
   CREATE = 2
 }

export class MealSaveAction {

  constructor(public action: MealActionType, public mealSaveRequest: MealSaveRequest) {}
}
