import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  goEdit = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Jengkol', 5),
    new Ingredient('Pete', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients.slice()[index];
  }

  editIngredient(id: number) {
    this.goEdit.next(id);
  }
  updateIngredient(ing: Ingredient, index: number) {
    this.ingredients[index] = ing;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIng(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ings: Ingredient[]) {
    this.ingredients.push(...ings);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
