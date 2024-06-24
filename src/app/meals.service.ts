import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, flatMap, forkJoin, map, mergeMap } from 'rxjs';
import { Meal, MealRaw, Recipe } from './types';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http:HttpClient) { }

  getMeals(): Observable<Meal[]> {
    return this.http.get<MealRaw[]>("http://localhost:8080/meals").pipe(
      mergeMap(mealsFromAPI => 
        // Map each MealFromAPI to an Observable that fetches the corresponding Recipe
        forkJoin(mealsFromAPI.map(mealFromAPI =>
          this.http.get<Recipe>(`http://localhost:8080/recipes/${mealFromAPI.recipeId}`).pipe(
            map(recipe => ({
              _id: mealFromAPI._id,
              recipe: recipe,
              plannedDate: mealFromAPI.plannedDate
            }))
          )
        ))
      )
    );
  }

  deleteMeal(mealId:string): Observable<Meal[]>{
    return this.http.delete<Meal[]>(`http://localhost:8080/meals/${mealId}`);  
  }

  addMeal(recipeId: string, plannedDate:string): Observable<MealRaw>{
    return this.http.post<MealRaw>(`http://localhost:8080/meals`,{recipeId:recipeId,plannedDate:new Date(plannedDate)});  
  }

}






