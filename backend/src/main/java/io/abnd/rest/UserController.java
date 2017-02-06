package io.abnd.rest;

import io.abnd.entity.UserRole;
import io.abnd.exception.ResourceNotFoundException;
import io.abnd.exception.UnauthorizedException;
import io.abnd.model.UserResponse;
import io.abnd.security.CustomSpringUser;
import io.abnd.service.intf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
public class UserController {
  @Autowired
  UserService userService;

  @GetMapping("/user/me")
  public UserResponse getUser(@AuthenticationPrincipal User user) throws ResourceNotFoundException {
    return userService.getClientFacingUserByName(user.getUsername()).orElseThrow(ResourceNotFoundException::new);
  }

  @GetMapping("/session-health")
  public void checkLogin(@AuthenticationPrincipal User user){}

  @GetMapping("/admin/users")
  public Page<UserResponse> getAllUsers(@AuthenticationPrincipal CustomSpringUser user, Pageable pageable) throws UnauthorizedException{
    Set<String> authorities = user.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toSet());
    if (!authorities.contains(UserRole.ADMIN) && !authorities.contains(UserRole.USER_ADMIN)) {
      throw new UnauthorizedException();
    }
    return userService.getAllUsers(pageable);
  }
}