package io.abnd.service.impl;
import io.abnd.entity.User;
import io.abnd.model.MealResponse;
import io.abnd.model.UserResponse;
import io.abnd.repository.MealRepository;
import io.abnd.repository.UserRepository;
import io.abnd.service.intf.MealService;
import io.abnd.service.intf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
public class MealServiceImpl implements MealService {
  MealRepository mealRepository;

  @Autowired
  public MealServiceImpl(final MealRepository mealRepository) {
    this.mealRepository = mealRepository;
  }

  public Page<MealResponse> findByUserId(long userId, Pageable pageable) {
    return mealRepository.findByUserId(userId, pageable).map(meal -> {
      return new MealResponse(meal.getId(), meal.getUserId(), meal.getMealTime(), meal.getCalorieValue(),
      meal.getDescription());
    });
  }
}