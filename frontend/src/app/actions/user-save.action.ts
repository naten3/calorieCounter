import { UserSaveRequest } from '../models';
export enum UserActionType {
   UPDATE =1 ,
   CREATE = 2
 }

export class UserSaveAction {

  constructor(public action: UserActionType, public userSaveRequest: UserSaveRequest) {}
}
