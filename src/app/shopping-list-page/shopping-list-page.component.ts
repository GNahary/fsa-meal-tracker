import { Component } from '@angular/core';
import { BackButtonComponent } from "../back-button/back-button.component";
import { Ingredient, Meal } from '../types';
import { Router } from '@angular/router';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-shopping-list-page',
  standalone: true,
  templateUrl: './shopping-list-page.component.html',
  styleUrl: './shopping-list-page.component.css',
  imports: [BackButtonComponent]
})
export class ShoppingListPageComponent {
  isLoading: boolean = false;
  shoppingListItems: Ingredient[] = [];

  allMeals: Meal[] = [];
  mealsPlan: (Meal | undefined)[] = [];
  existingIngredients: Ingredient[] = [];


  constructor(private router: Router, private mealsService: MealsService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { meals: Meal[], ingredients: Ingredient[] };
    if (state) {
      this.allMeals = state.meals.map(meal => ({
        ...meal,
        plannedDate: new Date(meal.plannedDate)
      }));

      this.existingIngredients = state.ingredients;
    }
  }

  ngOnInit() {
    this.mealsPlan = this.mealsService.getNext7Meals(this.allMeals);
    this.shoppingListItems = this.compileShoppingList();
  }

  private compileShoppingList(): Ingredient[] {
    const requiredIngredientsMap = new Map<string, Ingredient>();

    this.mealsPlan.forEach(meal => {
      meal?.recipe?.ingredients.forEach(requiredIngredient => {
        let ingredient = requiredIngredientsMap.get(requiredIngredient.name);
        if (ingredient) {
          ingredient.amount += requiredIngredient.amount;
        } else {
          requiredIngredientsMap.set(requiredIngredient.name, requiredIngredient);
        }
      })
    });

    this.existingIngredients.forEach(existingIngredient => {
      let requiredIngredient = requiredIngredientsMap.get(existingIngredient.name);
      if (requiredIngredient) {
        if (requiredIngredient?.amount < existingIngredient.amount) {
          requiredIngredientsMap.delete(requiredIngredient.name);
        } else {
          requiredIngredient.amount -= existingIngredient.amount;
        }
      }
    })

    return Array.from(requiredIngredientsMap.values());
  }

}
