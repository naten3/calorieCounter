package io.abnd.service.impl;
import io.abnd.entity.Meal;
import io.abnd.entity.User;
import io.abnd.model.MealRequest;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
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

  @Override
  public Page<MealResponse> findByUserId(long userId, Pageable pageable) {
    return mealRepository.findByUserId(userId, pageable).map(meal -> convertToResponse(meal));
  }

  @Override
  public MealResponse createMeal(final long userId, final MealRequest mealRequest) {
    Meal meal = convertToMeal(userId, mealRequest);
    Meal resultMeal = mealRepository.save(meal);
    return convertToResponse(resultMeal);
  }

  @Override public Optional<Meal> getMeal(final long id) {
    return Optional.ofNullable(mealRepository.findOne(id));
  }

  @Override public MealResponse updateMeal(final MealRequest mealRequest, final Meal originalMeal) {
    Meal meal = mergeMeal(originalMeal, mealRequest);
    Meal resultMeal = mealRepository.save(meal);
    return convertToResponse(resultMeal);
  }

  @Override
  public Page<MealResponse> findMealsInTimeRange(final long userId, final LocalDateTime startDateTime, final LocalDateTime endDateTime, final Pageable pageable) {
    return mealRepository.findByUserIdAndMealTimeBetween(userId, startDateTime, endDateTime, pageable).map(this::convertToResponse);
  }

  private MealResponse convertToResponse(Meal meal) {
    return new MealResponse(meal.getId(), meal.getUserId(), meal.getMealTime(), meal.getCalorieValue(),meal.getDescription());
  }

  private Meal convertToMeal(final long userId, MealRequest mealRequest) {
    Meal meal = new Meal();
    meal.setUserId(userId);
    meal.setCalorieValue(mealRequest.getCalorieValue());
    meal.setDescription(mealRequest.getDescription());
    meal.setMealTime(mealRequest.getMealTime());

    return meal;
  }

  private Meal mergeMeal(final Meal meal, final MealRequest mealRequest) {
    Meal newMeal = new Meal();
    newMeal.setId(meal.getId());
    newMeal.setUserId(meal.getUserId());
    newMeal.setMealTime(mealRequest.getMealTime());
    newMeal.setDescription(mealRequest.getDescription());
    newMeal.setCalorieValue(mealRequest.getCalorieValue());
    return newMeal;
  }

  @Override public void deleteMeal(final long id) {
    mealRepository.delete(id);
  }
}