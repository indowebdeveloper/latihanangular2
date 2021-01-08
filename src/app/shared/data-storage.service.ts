import { Recipe } from './../recipes/recipe-list/recipe.model';
import { RecipeService } from './../recipes/recipes.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as RcpActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private rcp: RecipeService,
    private store: Store<fromRoot.AppState>
  ) {}

  storeRecipes() {
    const rcps = this.rcp.getRecipes();
    return this.http
      .put(
        'https://recipe-f14d5-default-rtdb.firebaseio.com/recipes.json',
        rcps
      )
      .subscribe();
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-f14d5-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((rcps) => {
          return rcps.map((rcp) => {
            return {
              ...rcp,
              ingredients: rcp.ingredients ? rcp.ingredients : [],
            };
          });
        }),
        tap((rcps) => {
          // this.rcp.setRecipes(rcps);
          this.store.dispatch(new RcpActions.SetRecipes(rcps));
        })
      );
  }
}
