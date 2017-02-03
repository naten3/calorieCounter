package io.abnd.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Meal {

  @Id
  @Column(name = "MEAL_ID")
  private long id;
  private long userId;
  private LocalDateTime mealTime;
  private int calorieValue;
  private String description;

  public long getId() {
    return id;
  }

  public void setId(final long id) {
    this.id = id;
  }

  public long getUserId() {
    return userId;
  }

  public void setUserId(final long userId) {
    this.userId = userId;
  }

  public LocalDateTime getMealTime() {
    return mealTime;
  }

  public void setMealTime(final LocalDateTime mealTime) {
    this.mealTime = mealTime;
  }

  public int getCalorieValue() {
    return calorieValue;
  }

  public void setCalorieValue(final int calorieValue) {
    this.calorieValue = calorieValue;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(final String description) {
    this.description = description;
  }
}
