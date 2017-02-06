package io.abnd.model;

import java.util.Optional;
import java.util.Set;

public class UserResponse {

  private Long id;
  private String username;
  private Integer desiredCalories;
  private Set<String> roles;

  public UserResponse(final Long id, final String username, final Integer desiredCalories, final Set<String> roles) {
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

  public Integer getDesiredCalories() {
    return desiredCalories;
  }

  public Set<String> getRoles() {
    return roles;
  }
}
