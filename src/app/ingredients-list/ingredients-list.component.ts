import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '../types';
import { SmallXComponent } from "../small-x/small-x.component";
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-ingredients-list',
    standalone: true,
    templateUrl: './ingredients-list.component.html',
    styleUrl: './ingredients-list.component.css',
    imports: [SmallXComponent, RouterModule]
})
export class IngredientsListComponent {

  @Input() ingredients:Ingredient[] = [];
  @Input() isLoading:boolean = true;
  @Output() deleteIngredient = new EventEmitter<string>();

  onDelete(ingredientName: string) {
    this.deleteIngredient.emit(ingredientName);
  }

}
