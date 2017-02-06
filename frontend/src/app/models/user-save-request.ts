import { User } from './';

export class UserSaveRequest {
  public id: number;
  public desiredCalories: number;
  public password: string;

  constructor(){}

/**
This won't ever include a password, so you need to add that if you want to save it
*/
  static ofUser(user: User) :UserSaveRequest {
    let userRequest: UserSaveRequest = new UserSaveRequest();
    userRequest.id = user.id;
    userRequest.desiredCalories = user.desiredCalories
    return userRequest;
  }

  toRequestJson() :any{
    let req: any =  {
    id : this.id}
    if (this.desiredCalories != null) {
      req.desiredCalories = this.desiredCalories;
    }
    if (this.password != null) {
      req.password = this.password;
    }
    return req;
  }
}
