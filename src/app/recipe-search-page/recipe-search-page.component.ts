import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from '../meals.service';
import { RecipesService } from '../recipes.service';
import { IngredientsService } from '../ingredients.service';
import { BackButtonComponent } from "../back-button/back-button.component";
import { Ingredient, Recipe } from '../types';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeSearchResultsListComponent } from "../recipe-search-results-list/recipe-search-results-list.component";


@Component({
    selector: 'app-recipe-search-page',
    standalone: true,
    templateUrl: './recipe-search-page.component.html',
    styleUrl: './recipe-search-page.component.css',
    imports: [BackButtonComponent, RouterModule, FormsModule, RecipeSearchResultsListComponent]
})
export class RecipeSearchPageComponent {
  newMealDate: string = "";
  availableRecipes: Recipe[]=[];

  searchInputValue:string = '';
  ingredients:Ingredient[] = [];
  searchResults: Recipe[]=[];

  constructor(private route: ActivatedRoute, private ingredientsService: IngredientsService, private mealsService: MealsService, private recipesService:RecipesService, private location: Location){
  }

  ngOnInit(): void {
    this.newMealDate = this.route.snapshot.paramMap.get("newMealDate") || "";
    this.recipesService.getRecipes().subscribe(response=>{
      this.availableRecipes = response;
    });


    this.ingredientsService.getIngredients().subscribe(ingredients=>this.ingredients = ingredients);
  }

  onSearchClicked(){
    this.recipesService.getRecipes().subscribe(response=>{
      this.searchResults = response.filter(availableRecipe=>availableRecipe.name.toLowerCase().includes(this.searchInputValue.toLowerCase()));
      console.log("Relevent recipes are " + this.searchResults.map(recipe=>recipe.name));
    });
  }
}
