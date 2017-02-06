import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealSaveRequest } from '../../models';
import { MealSaveAction, MealActionType } from '../../actions'
import { DateUtils } from '../../common'

@Component({
  selector: 'cc-add-update-meal-modal',
  templateUrl: './add-update-meal.component.html'
})
export class AddUpdateMealComponent implements OnInit{

  mealRequest: MealSaveRequest;
  loading: boolean;
  mealForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;

  @ViewChild('addUpdateModal') public addUpdateModal: ModalDirective;
  @Output('mealSave') public mealSaveEmitter: EventEmitter<MealSaveAction>
  = new EventEmitter<MealSaveAction>();

  modalTitle: string;
  public mealSaveRequest: MealSaveRequest = new MealSaveRequest();
  public actionType: MealActionType;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm( new MealSaveRequest() );
  }

  save(value: any, valid: boolean) {
    if (valid) {
      this.loading = true;
      let request: MealSaveRequest = new MealSaveRequest();
      request.id = this.mealSaveRequest.id;
      request.description = value.description;
      request.calorieValue = value.calorieValue;
      request.mealTime = DateUtils.UTCFromLocalTimeString(value.mealTime);

      this.mealSaveEmitter.emit(new MealSaveAction(this.actionType, request));
    }
  }

  public showModal(mealSaveRequest: MealSaveRequest, mealActionType: MealActionType) {
    //reset modal
    this.mealForm.reset();
    this.loading = false;
    this.submitted = false;

    this.buildForm( mealSaveRequest );

    this.mealSaveRequest = mealSaveRequest;
    this.actionType = mealActionType;
    if ( this.actionType == MealActionType.UPDATE) {
      this.modalTitle = "Update Meal"
    } else {
      this.modalTitle = "Add New Meal"
    }
    this.addUpdateModal.show()
  }

  private buildForm( initialRequest: MealSaveRequest ) {
    let initialDescription;
    let initialCalorieValue;
    let initialMealTime;
    if (initialRequest.description == null) {
      initialDescription = "";
    } else {
      initialDescription = initialRequest.description;
    }
    if (initialRequest.calorieValue == null) {
      initialCalorieValue = "calorieValue";
    } else {
      initialCalorieValue = initialRequest.calorieValue;
    }
    if (initialRequest.mealTime == null) {
      initialMealTime = "";
    } else {
      initialMealTime = DateUtils.getDateStringForFormInit(initialRequest.mealTime);
    }
    this.mealForm = this.formBuilder.group({
            description: [initialDescription, [Validators.required]],
            calorieValue: [initialCalorieValue, [Validators.compose([Validators.required, Validators.pattern('^[1-9]\\d{0,4}$')])]],
            mealTime: [initialMealTime, [Validators.required]]
        });
  }

  public mealSaveSucceded() {
    this.loading = false;
    this.modalTitle = "Success!"
    setTimeout(()=>{ this.addUpdateModal.hide() }, 500)
  }

}
