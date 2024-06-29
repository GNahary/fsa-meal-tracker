import { Injectable } from '@angular/core';
import { Ingredient } from './types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private http:HttpClient) { }

  getShoppingList():Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(`http://localhost:8080/shopping-list`);  
  }
}
