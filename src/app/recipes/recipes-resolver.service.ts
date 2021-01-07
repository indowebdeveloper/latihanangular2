import { RecipeService } from './recipes.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe-list/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private ds: DataStorageService, private rcpS: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.rcpS.getRecipes();
    // if (recipes.length === 0) {
    //   return this.ds.fetchRecipes();
    // } else {
    //   return recipes;
    // }
    return this.ds.fetchRecipes();
  }
}
