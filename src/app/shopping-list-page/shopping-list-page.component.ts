import { Component, Input } from '@angular/core';
import { BackButtonComponent } from "../back-button/back-button.component";
import { Ingredient, Meal } from '../types';
import { ShoppingListService } from '../shopping-list.service';

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


constructor(private shoppingListService:ShoppingListService){}

ngOnInit(){
  this.shoppingListService.getShoppingList().subscribe(list=>this.shoppingListItems = list);
}

}
