package io.abnd.service.intf;

import io.abnd.model.MealRequest;
import io.abnd.model.MealResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MealService {
  public Page<MealResponse> findByUserId(long userId, Pageable pageable);

  public MealResponse createMeal(long userId, MealRequest mealRequest);

  public MealResponse updateMeal(long userId, long mealId, MealRequest mealRequest);
}
