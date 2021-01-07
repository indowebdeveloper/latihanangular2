import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe-list/recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [],
})
export class RecipesComponent implements OnInit {
  constructor(private ds: DataStorageService) {}
  ngOnInit(): void {
    // this.ds.fetchRecipes().subscribe();
    console.log('its from parent');
  }
}
