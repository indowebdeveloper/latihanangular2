import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe-list/recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromRoot from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     1,
  //     'Test Resep',
  //     'Ini adalah test',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
  //     [new Ingredient('Kentang', 1), new Ingredient('Roti', 2)]
  //   ),
  //   new Recipe(
  //     2,
  //     'Test Resep 2',
  //     'Ini adalah test',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
  //     [new Ingredient('Martabak', 5), new Ingredient('Keju', 11)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  constructor(private store: Store<fromRoot.AppState>) {}

  getRecipes() {
    return this.recipes;
  }
  getRecipe(id: number) {
    return this.recipes.find((obj) => obj.id == id);
  }

  setRecipes(rcps: Recipe[]) {
    this.recipes = rcps;
    this.recipesChanged.next(this.recipes);
  }
  addToShoppingList(ings: Ingredient[]) {
    // this.slService.addIngredients(ings);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ings));
  }

  addRecipe(rcp: Recipe) {
    const id =
      this.recipes.length > 0
        ? Math.max.apply(
            Math,
            this.recipes.map(function (o) {
              return o.id;
            })
          ) + 1
        : 1;
    rcp.id = id;
    this.recipes.push(rcp);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(rcp: Recipe) {
    const index = this.recipes.findIndex((obj) => obj.id == rcp.id);
    this.recipes[index] = rcp;
    this.recipesChanged.next(this.recipes);
  }
  deleteRecipe(id: number) {
    const index = this.recipes.findIndex((obj) => obj.id == id);
    this.recipes.splice(index, 1);
  }
}
