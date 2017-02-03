package io.abnd.rest;

import io.abnd.exception.ResourceNotFoundException;
import io.abnd.model.UserResponse;
import io.abnd.service.intf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
  @Autowired
  UserService userService;

  @GetMapping("/user/me")
  public UserResponse getUser(@AuthenticationPrincipal User user) throws ResourceNotFoundException {
    return userService.getClientFacingUserByName(user.getUsername()).orElseThrow(ResourceNotFoundException::new);
  }

  @GetMapping("/session-health")
  public void checkLogin(@AuthenticationPrincipal User user) {}

}