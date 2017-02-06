package io.abnd.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "ROLE")
public class UserRole {

  public static final String USER = "USER";
  public static final String USER_ADMIN = "USER_ADMIN";
  public static final String ADMIN = "ADMIN";

  @Id
  @Column(name = "ROLE_ID")
  private long id;

  private String roleName;

  public long getId() {
    return id;
  }

  public void setId(final long id) {
    this.id = id;
  }

  public String getRoleName() {
    return roleName;
  }

  public void setRoleName(final String roleName) {
    this.roleName = roleName;
  }
}
