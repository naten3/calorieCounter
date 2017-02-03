package io.abnd.model;

import java.util.Set;

public class UserResponse {

  private Long id;
  private String username;
  private Set<String> roles;

  public UserResponse(final Long id, final String username, final Set<String> roles) {
    this.id = id;
    this.username = username;
    this.roles = roles;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public Set<String> getRoles() {
    return roles;
  }
}
