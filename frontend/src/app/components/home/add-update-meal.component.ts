import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  submitted: boolean = false;

  @ViewChild('addUpdateModal') public addUpdateModal:ModalDirective;
  @Output('mealSave') public mealSaveEmitter: EventEmitter<MealSaveAction>
  = new EventEmitter<MealSaveAction>();

  modalTitle: string;
  public mealSaveRequest: MealSaveRequest = new MealSaveRequest();
  public actionType: MealActionType;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.mealForm = this.formBuilder.group({
            description: ['', [Validators.required]],
            calorieValue: ['', [Validators.compose([Validators.required, Validators.pattern('^[1-9]\\d{0,4}$')])]],
            mealTime: ['', [Validators.required]]
        });
  }

  save(value: any, valid: boolean) {
    this.submitted = true;
    if (valid) {
      let request: MealSaveRequest = new MealSaveRequest();
      request.description = value.description;
      request.calorieValue = value.calorieValue;
      request.mealTime = new Date(value.mealTime);

      this.mealSaveEmitter.emit(new MealSaveAction(this.actionType, request));
    }
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
