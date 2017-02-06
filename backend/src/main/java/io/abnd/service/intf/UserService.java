package io.abnd.service.intf;

import io.abnd.entity.User;
import io.abnd.model.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface UserService {
  public Optional<User> getUser(String username);

  public Optional<UserResponse> getClientFacingUserByName(String username);

  public Optional<UserResponse> getClientFacingUserById(long id);

  public Page<UserResponse> getAllUsers(Pageable pageable);
}
