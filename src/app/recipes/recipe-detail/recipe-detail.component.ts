import { RecipeService } from './../recipes.service';
import { Recipe } from './../recipe-list/recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input('recipeData') recipe: Recipe;
  constructor(private rcpService: RecipeService) {}

  ngOnInit(): void {}

  addToShoppingList() {
    this.rcpService.addToShoppingList(this.recipe.ingredients);
  }
}
