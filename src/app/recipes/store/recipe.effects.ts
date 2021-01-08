import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe-list/recipe.model';
import { Injectable } from '@angular/core';
import * as fromRoot from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FECTH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-f14d5-default-rtdb.firebaseio.com/recipes.json'
      );
    }),
    map((rcps) => {
      rcps = rcps !== null ? rcps : [];
      return rcps.map((rcp) => {
        return {
          ...rcp,
          ingredients: rcp.ingredients ? rcp.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      console.log(recipes);
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, iniRecipeStateDapatDariAtas]) => {
      console.log('storeee');
      return this.http.put(
        'https://recipe-f14d5-default-rtdb.firebaseio.com/recipes.json',
        iniRecipeStateDapatDariAtas.recipes
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRoot.AppState>
  ) {}
}
