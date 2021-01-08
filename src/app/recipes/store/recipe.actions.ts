import { Recipe } from './../recipe-list/recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = '[Rcps] Set Recipes';
export const FECTH_RECIPES = '[Rcps] Fetch Recipes';
export const ADD_RECIPE = '[Rcp] Add Recipe';
export const UPDATE_RECIPE = '[Rcp] Update Recipe';
export const DEL_RECIPE = '[Rcp] Delete Recipe';
export const STORE_RECIPES = '[Rcps] Store Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}
export class FetchRecipes implements Action {
  readonly type = FECTH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = DEL_RECIPE;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type TheActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
