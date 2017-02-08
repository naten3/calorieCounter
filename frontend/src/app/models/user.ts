
export class User {

  public static USER_ROLE = "USER";
  public static USER_ADMIN_ROLE = "USER_ADMIN";
  public static ADMIN_ROLE = "ADMIN";

  //this is not used for admins and should probably be refactored
  public id: number;
  public username: string;
  public roles: string[];
  public desiredCalories: number
  public email: string

  public token: string;

  constructor( o: any){
    this.id = o.id;
    this.username = o.username;
    this.roles = o.roles;
    this.desiredCalories = o.desiredCalories;
    this.email = o.email;
  }

  public hasRole(role: String) {
    for (let r of this.roles) {
      if(r == role) {
        return true;
      }
    }
    return false;
  }
}
