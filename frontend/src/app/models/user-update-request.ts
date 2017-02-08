
export class UserUpdateRequest {

  public id: number;
  public desiredCalories: number
  public email: string

  constructor( o: any){
    this.id = o.id;
    this.desiredCalories = o.desiredCalories;
    this.email = o.email;
  }

  public toRequestJson() :any{
    return {
      desiredCalories: this.desiredCalories,
      email: this.email
    }
  }
}
