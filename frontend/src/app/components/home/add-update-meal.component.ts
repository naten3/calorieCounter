import { Component, OnInit, OnDestroy, EventEmitter, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ModalDirective } from 'ng2-bootstrap/modal';
import { MealSaveRequest } from '../../models';
import { MealSaveAction, MealActionType } from '../../actions'

@Component({
  selector: 'cc-add-update-meal-modal',
  templateUrl: './add-update-meal.component.html',
  styleUrls: []
})
export class AddUpdateMealComponent implements OnInit, OnDestroy {

  mealRequest: MealSaveRequest;
  loading: boolean;

  @ViewChild('addUpdateModal') public addUpdateModal:ModalDirective;

  modalTitle: string = "Create Or Update";
  public mealSaveRequest: MealSaveRequest = new MealSaveRequest();
  public actionType: MealActionType;

  constructor() {}

  ngOnInit() {
  }

  save() {
    this.loading = true;
    console.log("Passing meal to parent");
  }

  public showModal(mealSaveRequest: MealSaveRequest, mealActionType: MealActionType) {
    this.mealSaveRequest = mealSaveRequest;
    this.actionType = mealActionType;
    if ( this.actionType == MealActionType.UPDATE) {
      this.modalTitle = "Update Meal"
    } else {
      this.modalTitle = "Add New Meal"
    }
    this.addUpdateModal.show()
  }

  ngOnDestroy() {
  }

}
