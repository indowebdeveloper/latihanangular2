import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-list/recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Test Resep',
      'Ini adalah test',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      [new Ingredient('Kentang', 1), new Ingredient('Roti', 2)]
    ),
    new Recipe(
      2,
      'Test Resep 2',
      'Ini adalah test',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg',
      [new Ingredient('Martabak', 5), new Ingredient('Keju', 11)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // disini kita pakai slice untuk mengkopi array nya, karena tanpa slice maka kita mengggunakan direct reference
  }
  getRecipe(id: number) {
    return this.recipes.find((obj) => obj.id == id);
  }
  addToShoppingList(ings: Ingredient[]) {
    this.slService.addIngredients(ings);
  }
}
