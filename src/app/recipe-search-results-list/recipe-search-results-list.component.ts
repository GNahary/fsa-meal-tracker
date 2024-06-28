import { Component, Input } from '@angular/core';
import { MealsService } from '../meals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient, Recipe } from '../types';

@Component({
  selector: 'app-recipe-search-results-list',
  standalone: true,
  imports: [],
  templateUrl: './recipe-search-results-list.component.html',
  styleUrl: './recipe-search-results-list.component.css'
})
export class RecipeSearchResultsListComponent {

  @Input() recipes:Recipe[] = [];
  @Input() ingredients: Ingredient[] = [];
  selectedDate:string = '';

  ngOnInit(){
    this.selectedDate = this.activatedRoute.snapshot.paramMap.get("newMealDate") || "";

  }


  constructor(private mealsService: MealsService, private activatedRoute:ActivatedRoute, private router:Router){}

  addMealWithRecipe(recipeId:string){
    this.mealsService.addMeal(recipeId,this.selectedDate).subscribe(response=>{
      console.log("Great success! Added " + response);
    });

    this.router.navigateByUrl('/');
  }

  getMissingIngredients(recipe:Recipe):Ingredient[]{
    return recipe.ingredients.filter(recipeIngredient=> !this.ingredients.some(ingredient=>ingredient.name.toLowerCase() === recipeIngredient.name.toLowerCase()));
  }

}
