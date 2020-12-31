import { RecipeService } from './../../recipes.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeData') recipe: Recipe;

  constructor(private rcpService: RecipeService) {}

  ngOnInit(): void {}

  onSelected() {
    this.rcpService.recipeSelected.emit(this.recipe);
  }
}
