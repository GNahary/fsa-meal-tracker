import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackButtonComponent } from "../back-button/back-button.component";
import { FormsModule } from '@angular/forms';
import { IngredientsService } from '../ingredients.service';


@Component({
    selector: 'app-add-ingredient-page',
    standalone: true,
    templateUrl: './add-ingredient-page.component.html',
    styleUrl: './add-ingredient-page.component.css',
    imports: [BackButtonComponent, FormsModule]
})
export class AddIngredientPageComponent {

  ingredient_name: string = '';
  amount: number = 0;
  units: string = '';
  unitOptions =['lb', 'cups', 'tablespoons', 'teaspoons', 'count', 'sticks']

  constructor(private ingredientsService:IngredientsService, private router:Router, private activeRout:ActivatedRoute){}

  addIngredient() {
    console.log(this.ingredient_name +" "+this.amount+" "+this.units);
    this.ingredientsService.addIngredient({name: this.ingredient_name, amount: this.amount, units: this.units}).subscribe(response=>{
      console.log("Great success! Added " + response);
      this.router.navigateByUrl('/');
    });
  }




}
