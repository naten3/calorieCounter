import { Component, OnInit, Input } from '@angular/core';
import { Meal } from "../../models";

@Component({
  selector: 'cc-meal-item',
  template:
  `<div class="card" style="width: 20rem;">
     <div class="card-block">
       <h4 class="card-title">{{meal.description}}</h4>
        <dl>
          <dt>Calories:</dt>
          <dd>{{meal.calorieValue}}</dd>
          <dt>Time Eaten</dt>
          <dd>{{meal.mealTime | date:'MMMM d yyyy, h:mm a'}}</dd>
        </dl>
     <a href="#" class="btn btn-primary">Edit</a>
    </div>
  </div>`,
  styleUrls: []
})

export class MealItemComponent implements OnInit {
  @Input() meal: Meal;

  constructor() { }

  ngOnInit() {
  }

}
