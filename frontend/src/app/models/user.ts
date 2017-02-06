
export class User {

  public static USER_ROLE = "USER";
  public static USER_ADMIN_ROLE = "USER_ADMIN";
  public static ADMIN_ROLE = "ADMIN";

  constructor(
    public id: number,
    public username: string,
    public roles: string[],
    public token: string
  ){}
}
