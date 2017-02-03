
export class User {

  public static USER_ROLE = "USER";
  public static USER_ADMIN_ROLE = "USER_ADMIN";
  public static ADMIN_ROLE = "ADMIN";

  constructor(
    private id: number,
    private username: string,
    private roles: string[],
    private token: string
  ){}

  getToken() :string {
    return this.token;
  }
}
