import { Component, OnInit } from '@angular/core';
import { MealsListComponent } from "../meals-list/meals-list.component";
import { IngredientsListComponent } from "../ingredients-list/ingredients-list.component";
import { MealsService } from '../meals.service';
import { IngredientsService } from '../ingredients.service';
import { Ingredient, Meal } from '../types';
import { error } from 'console';
import e from 'express';



@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [MealsListComponent, IngredientsListComponent]
})
export class HomepageComponent implements OnInit{

  isLoadingMeals:boolean = true;
  meals:Meal[] = [];

  isLoadingIngredients:boolean = true;
  ingredients:Ingredient[] = [];


  constructor(private mealsService: MealsService, private ingredientsService:IngredientsService){}

  ngOnInit(): void {
       this.mealsService.getMeals().subscribe(response=>{
        this.meals = response;
        this.isLoadingMeals = false;
      });

      this.ingredientsService.getIngredients().subscribe(response=>{
        this.ingredients = response;
        this.isLoadingIngredients = false;
      });
      
  }


  onDeleteMeal(mealId: string) {
    this.mealsService.deleteMeal(mealId).subscribe(updatedMeals=>{
      this.meals = updatedMeals;
    });
  }

    onDeleteIngredient(ingregientId: string) {
      this.ingredientsService.deleteIngredient(ingregientId).subscribe(updatedIngredients=>{
        this.ingredients = updatedIngredients;
      }
    ,(error)=>{console.log(error)}
    
    )
      
    }
}
