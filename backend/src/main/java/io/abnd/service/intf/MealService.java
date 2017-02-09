package io.abnd.service.intf;

import io.abnd.model.MealRequest;
import io.abnd.model.MealResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface MealService {
  public Page<MealResponse> findByUserId(long userId, Pageable pageable);

  public MealResponse createMeal(long userId, MealRequest mealRequest);

  public MealResponse updateMeal(long userId, long mealId, MealRequest mealRequest);

  public Page<MealResponse> findMealsInTimeRange(final long userId, final LocalDateTime startDateTime,
                                                 final LocalDateTime endDateTime, final Pageable pageable);
  }
