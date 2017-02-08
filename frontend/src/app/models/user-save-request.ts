import { User } from './';

export class UserSaveRequest {
  public id: number;
  public desiredCalories: number;
  public email: string;
  public username: string;
  public password: string;

  constructor(){}

  static ofUser(user: User) :UserSaveRequest {
    let userRequest: UserSaveRequest = new UserSaveRequest();
    userRequest.id = user.id;
    userRequest.desiredCalories = user.desiredCalories
    userRequest.email = user.email;
    return userRequest;
  }
}
