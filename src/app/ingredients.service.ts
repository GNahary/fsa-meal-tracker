import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Ingredient } from './types';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http:HttpClient) { }

  getIngredients():Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>("http://localhost:8080/ingredients");  
  }

  deleteIngredient(ingredientId:string): Observable<Ingredient[]>{
    return this.http.delete<Ingredient[]>(`http://localhost:8080/ingredients/${ingredientId}`);  
  }
}
