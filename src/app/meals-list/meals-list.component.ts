import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Meal } from '../types';
import { SmallXComponent } from "../small-x/small-x.component";
import { Router, RouterModule } from '@angular/router';
import { MealsService } from '../meals.service';


@Component({
  selector: 'app-meals-list',
  standalone: true,
  templateUrl: './meals-list.component.html',
  styleUrl: './meals-list.component.css',
  imports: [SmallXComponent, RouterModule]
})
export class MealsListComponent {

  @Input() isLoading: boolean = true;
  @Input() meals: (Meal)[] = [];
  @Output() deleteMeal = new EventEmitter<string>();
  next7Meals: (Meal | undefined)[] = this.getNext7Meals();

  constructor(private mealsService: MealsService, private router: Router) { };

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

  private getNext7Meals(): (Meal | undefined)[] {
    return this.mealsService.getNext7Meals(this.meals);
  }

  getFutureDate(offset: number): Date {
    let today = new Date();
    return new Date(today.getTime() + (offset * 24 * 60 * 60 * 1000));
  }


}
