import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
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
    return this.http.delete<MealRaw[]>(`http://localhost:8080/meals/${mealId}`).pipe(
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

  addMeal(recipeId: string, plannedDate:string): Observable<MealRaw>{
    return this.http.post<MealRaw>(`http://localhost:8080/meals`,{recipeId:recipeId,plannedDate:new Date(plannedDate)});  
  }


  

  getNext7Meals(allMeals:Meal[]):(Meal | undefined)[]{
    const today = new Date();
    today.setHours(0,0,0,0);
    const nextWeekPlannedMeals = allMeals
    .filter(meal=>{ return meal.plannedDate >= today && meal.plannedDate <= this.getFutureDate(6)})
    .sort((mealA, mealB) => mealA.plannedDate.getDate() - mealB.plannedDate.getDate());

    return this.setMealPlan(nextWeekPlannedMeals);
  }



  private setMealPlan(nextWeekPlannedMeals:Meal[]):(Meal | undefined)[]{
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






