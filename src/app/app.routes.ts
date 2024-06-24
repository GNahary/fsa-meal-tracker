import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddIngredientPageComponent } from './add-ingredient-page/add-ingredient-page.component';
import { ShoppingListPageComponent } from './shopping-list-page/shopping-list-page.component';
import { RecipeSearchPageComponent } from './recipe-search-page/recipe-search-page.component';


export const routes: Routes = [
    {path: '', component: HomepageComponent }, // Home page route
    {path:'ingredients', component: AddIngredientPageComponent},
    {path:'shop', component: ShoppingListPageComponent},
    {path:'recipes', component: RecipeSearchPageComponent},
    {path:'recipes/:newMealDate', component: RecipeSearchPageComponent}
];




