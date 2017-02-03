package io.abnd.service.impl;
import io.abnd.entity.User;
import io.abnd.model.UserResponse;
import io.abnd.repository.UserRepository;
import io.abnd.service.intf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
public class UserServiceImpl implements UserService {
  UserRepository userRepository;

  @Autowired
  public UserServiceImpl(final UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Optional<User> getUser(String username) {
    return userRepository.findByUsername(username);
  }


  public Optional<UserResponse> getClientFacingUserByName(String username) {
    return getUser(username).map(this::convertToUserResponse);
  }

  public Optional<UserResponse> getClientFacingUserById(long id) {
    return Optional.ofNullable(userRepository.findOne(id)).map(this::convertToUserResponse);
  }

  private UserResponse convertToUserResponse(User user) {
    Set<String> roles = user.getRoles().stream()
    .map(role -> role.getRoleName())
    .collect(Collectors.toSet());
    return new UserResponse(user.getId(), user.getUsername(), roles);
  }
}