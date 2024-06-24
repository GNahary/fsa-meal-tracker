import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from '../meals.service';
import { RecipesService } from '../recipes.service';
import { BackButtonComponent } from "../back-button/back-button.component";
import { Recipe } from '../types';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';


@Component({
    selector: 'app-recipe-search-page',
    standalone: true,
    templateUrl: './recipe-search-page.component.html',
    styleUrl: './recipe-search-page.component.css',
    imports: [BackButtonComponent, RouterModule]
})
export class RecipeSearchPageComponent {
  newMealDate: string = "";
  availableRecipes: Recipe[]=[];

  constructor(private route: ActivatedRoute, private programmaticRouter: Router, private mealsService: MealsService, private recipesService:RecipesService, private location: Location){
  }

  ngOnInit(): void {
    this.newMealDate = this.route.snapshot.paramMap.get("newMealDate") || "";
    this.recipesService.getRecipes().subscribe(response=>{
      this.availableRecipes = response;
    });
  }

  addMeal(recipeId:string){
    this.mealsService.addMeal(recipeId,this.newMealDate).subscribe(response=>{
      console.log("Great success! Added " + response);
    });
    this.location.back();
  }

}
