package io.abnd.rest;

import io.abnd.exception.UnauthorizedException;
import io.abnd.model.MealResponse;
import io.abnd.model.Message;
import io.abnd.model.UserResponse;
import io.abnd.security.CustomSpringUser;
import io.abnd.service.intf.MealService;
import io.abnd.service.intf.TestService;
import io.abnd.service.intf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class MealController {

  @Autowired
  private MealService mealService;

  @CrossOrigin(origins = "http://localhost:3000")
  @GetMapping("/users/{userId}/meals")
  public @ResponseBody Page<MealResponse> getMeals(@AuthenticationPrincipal User principal, @PathVariable long userId, Pageable pageable)
  throws UnauthorizedException {
    if (((CustomSpringUser) principal).getId() != userId) {
      throw new UnauthorizedException();
    }
    return mealService.findByUserId(userId, pageable);
  }
}
