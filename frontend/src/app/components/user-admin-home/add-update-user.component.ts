import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { ModalDirective } from 'ng2-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSaveRequest } from '../../models';
import { UserSaveAction, UserActionType } from '../../actions'

@Component({
  selector: 'cc-add-update-user-modal',
  templateUrl: './add-update-user.component.html'
})
export class AddUpdateUserComponent implements OnInit{

  @ViewChild('addUpdateModal') public addUpdateModal: ModalDirective;
  @Output('userSave') public userSaveEmitter: EventEmitter<UserSaveAction>
  = new EventEmitter<UserSaveAction>();

  userRequest: UserSaveRequest;
  modalTitle: string;
  loading: boolean;
  userForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  userSaveRequest: UserSaveRequest = new UserSaveRequest();
  actionType: UserActionType;
  saveRequest: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm( new UserSaveRequest(), UserActionType.CREATE );
  }

  save(value: any, valid: boolean) {
    this.submitted = true;
    if (valid) {
      this.loading = true;
      let request: UserSaveRequest = new UserSaveRequest();
      request.id = this.userSaveRequest.id;
      request.email = value.email;
      request.desiredCalories = value.desiredCalories;
      if (this.actionType == UserActionType.CREATE) {
        request.password = value.password;
        request.username = value.username;
      }

      this.userSaveEmitter.emit(new UserSaveAction(this.actionType, request));
    }
  }

  public showModal(userSaveRequest: UserSaveRequest, userActionType: UserActionType) {
    //reset modal
    this.userForm.reset();
    this.loading = false;
    this.submitted = false;

    this.buildForm( userSaveRequest, userActionType );

    this.userSaveRequest = userSaveRequest;
    this.actionType = userActionType;
    this.saveRequest = userActionType == UserActionType.CREATE;
    if ( userActionType == UserActionType.UPDATE) {
      this.modalTitle = "Update User"
    } else {
      this.modalTitle = "Create New User"
    }
    this.addUpdateModal.show()
  }

  private buildForm( initialRequest: UserSaveRequest, actionType: UserActionType ) {
    let initialDesiredCalories;
    let initialEmail;
    if (initialRequest.desiredCalories == null) {
      initialDesiredCalories = "";
    } else {
      initialDesiredCalories = initialRequest.desiredCalories;
    }
    if (initialRequest.email == null) {
      initialEmail = "";
    } else {
      initialEmail = initialRequest.email;
    }
    let builderGroup: any = {
            desiredCalories: [initialDesiredCalories, [Validators.pattern('^[1-9]\\d{0,4}$')]],
            email: [initialEmail, [Validators.required]]
        }
    if (UserActionType.CREATE == actionType) {
      builderGroup.password  = ['', [Validators.compose([Validators.required, Validators.maxLength(100),
         Validators.minLength(8)])]];
      builderGroup.username  = ['', [Validators.compose([Validators.required, Validators.maxLength(100)])]];
    }
    this.userForm = this.formBuilder.group(builderGroup);
  }

  public userSaveSucceded() {
    this.loading = false;
    this.modalTitle = "Success!"
    setTimeout(()=>{ this.addUpdateModal.hide() }, 500)
  }

}
