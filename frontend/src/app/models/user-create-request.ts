
export class UserCreateRequest {

  public username: string;
  public password: string
  public desiredCalories: number
  public email: string

  constructor( o: any){
    this.username = o.username;
    this.password = o.password;
    this.desiredCalories = o.desiredCalories;
    this.email = o.email;
  }

  public toRequestJson() :any{
    return {
      username: this.username,
      password: this.password,
      desiredCalories: this.desiredCalories,
      email: this.email
    }
  }
}
