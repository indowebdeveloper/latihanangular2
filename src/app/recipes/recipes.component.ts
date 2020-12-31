import { Recipe } from './recipe-list/recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private rcpService: RecipeService) {
    this.rcpService.recipeSelected.subscribe(
      (recipe: Recipe) => (this.selectedRecipe = recipe)
    );
  }

  ngOnInit(): void {}
}
