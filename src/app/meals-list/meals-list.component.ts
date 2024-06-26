import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Meal } from '../types';
import { SmallXComponent } from "../small-x/small-x.component";
import { RouterModule } from '@angular/router';
import { MealsService } from '../meals.service';

@Component({
    selector: 'app-meals-list',
    standalone: true,
    templateUrl: './meals-list.component.html',
    styleUrl: './meals-list.component.css',
    imports: [SmallXComponent, RouterModule]
})
export class MealsListComponent {

  @Input() isLoading:boolean = true;
  @Input() meals:(Meal)[] = [];
  @Output() deleteMeal = new EventEmitter<string>();
  next7Meals:(Meal | undefined)[] = this.getNext7Meals();

  constructor(private mealsService:MealsService){};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['meals'] && this.meals) {

      this.meals = this.meals.map(meal => ({
        ...meal,
        plannedDate: new Date(meal.plannedDate)
      }));

      this.next7Meals = this.getNext7Meals();

    }
  }


  onDelete(mealId: string) {
    this.deleteMeal.emit(mealId);
  }

  private getNext7Meals():(Meal | undefined)[]{
    const today = new Date();
    const nextWeekPlannedMeals = this.meals
    .filter(meal=>{ return meal.plannedDate >= today && meal.plannedDate <= this.getFutureDate(6)})
    .sort((mealA, mealB) => mealA.plannedDate.getDate() - mealB.plannedDate.getDate());

    const nextWeekMeals = Array<(Meal | undefined)>(7);
    for (let index = 0; index < 7; index++) {
      let date = this.getFutureDate(index).getDate();
      nextWeekMeals[index] = nextWeekPlannedMeals.find(meal=>meal.plannedDate.getDate()===date);
    }

    return nextWeekMeals;
  }


  getFutureDate(offset:number):Date{
    let today = new Date();
    return new Date(today.getTime() + (offset * 24 * 60 * 60 * 1000));
  }


}
