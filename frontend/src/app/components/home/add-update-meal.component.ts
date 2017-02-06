import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MealSaveRequest } from '../../models';
import { MealSaveAction, MealActionType } from '../../actions'

@Component({
  selector: 'cc-add-update-meal-modal',
  templateUrl: './add-update-meal.component.html'
})
export class AddUpdateMealComponent implements OnInit{

  mealRequest: MealSaveRequest;
  loading: boolean;
  mealForm: FormGroup;

  @ViewChild('addUpdateModal') public addUpdateModal:ModalDirective;
  @Output('mealSave') public mealSaveEmitter: EventEmitter<MealSaveAction>;

  modalTitle: string;
  public mealSaveRequest: MealSaveRequest = new MealSaveRequest();
  public actionType: MealActionType;

  constructor(private formBuilder: FormBuilder) {}

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

  public mealSaveSucceded() {

  }

}
