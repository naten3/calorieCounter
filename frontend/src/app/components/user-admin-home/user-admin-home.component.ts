import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCrudService, UserService } from '../../services';
import { User, PaginatedData, UserSaveRequest, UserCreateRequest, UserUpdateRequest } from '../../models';
import { UserSaveAction, UserActionType } from '../../actions';
import { AddUpdateUserComponent } from './';

@Component({
  templateUrl: './user-admin-home.component.html'
})
export class UserAdminHomeComponent implements OnInit {
  public static PAGE_SIZE: number = 4;
  page: number = 0;
  userPage: PaginatedData;
  loadingPage: boolean = false;
  userSave: EventEmitter<UserSaveAction>;

@ViewChild('addUpdateUser') addUpdateUserComponent: AddUpdateUserComponent;

  constructor(private route: ActivatedRoute, private userCrudService: UserCrudService,
     private userService: UserService) {}

  ngOnInit() {
    this.userPage = this.route.snapshot.data['users'];
  }

  getPage(): number {
    return this.userPage.number + 1;
  }

  hasNextPage() :boolean {
    return this.userPage.number < this.userPage.totalPages - 1;
  }

  hasPreviousPage() :boolean {
    return this.userPage.number > 0;
  }

  nextPage() {
    this.updatePage(this.userPage.number + 1);
  }

  previousPage() {
    this.updatePage(this.userPage.number - 1);
  }

  updatePage(newPage: number) {
    this.userCrudService.getAllUsers( newPage, UserAdminHomeComponent.PAGE_SIZE).subscribe( userPage => {
      this.userPage = userPage;
    })
  }

  createUserModal() {
    this.addUpdateUserComponent.showModal(new UserSaveRequest(), UserActionType.CREATE);
  }

  updateUserModal(u: User) {
    let userSaveRequest: UserSaveRequest = new UserSaveRequest();
    userSaveRequest.id = u.id;
    userSaveRequest.email = u.email;
    userSaveRequest.desiredCalories = u.desiredCalories;
    this.addUpdateUserComponent.showModal(userSaveRequest, UserActionType.UPDATE);
  }

  handleSaveRequest(u: UserSaveAction) {
    if (u.action == UserActionType.CREATE) {
      let userCreateRequest :UserCreateRequest = new UserCreateRequest(u.userSaveRequest);
      this.userCrudService.createUser(userCreateRequest).subscribe( user => {
        this.addUpdateUserComponent.userSaveSucceded();
        this.updatePage(this.userPage.number);
      });
    } else {
      let userCreateRequest :UserUpdateRequest = new UserUpdateRequest(u.userSaveRequest);
      this.userCrudService.updateUser(userCreateRequest).subscribe( user => {
        this.addUpdateUserComponent.userSaveSucceded();
        for ( let i = 0; i < this.userPage.items.length ; i++) {
          if (this.userPage.items[i].id == user.id) {
            this.userPage.items[i] = user;
            break;
          }
        }
      });
    }
  }

}
