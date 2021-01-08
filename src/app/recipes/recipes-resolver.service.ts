import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipeService } from './recipes.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe-list/recipe.model';
import * as fromRoot from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.actions';
import { map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromRoot.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.rcpS.getRecipes();
    // if (recipes.length === 0) {
    //   return this.ds.fetchRecipes();
    // } else {
    //   return recipes;
    // }
    // return this.ds.fetchRecipes();
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => {
        return recipesState.recipes;
      }),
      switchMap((recipes) => {
        if (recipes.length == 0) {
          this.store.dispatch(new RecipesAction.FetchRecipes());
          return this.actions$.pipe(ofType(RecipesAction.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
