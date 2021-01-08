import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';

/**
 * [ShopList] dibawah ini fungsi nya untuk prefixing
 * karena string yang ada didalam constant variable ini harus 100% unik pada application wide,
 * not just class wide
 *
 * sedangkan untuk annotation uppercase variable nya ( eg export const ADD_INGREDIENT ), tidak perlu diberi prefixing karena terscope didalam sebuah import
 */
export const ADD_INGREDIENT = '[ShopList] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[ShopList] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[ShopList] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[ShopList] DELETE_INGREDIENT';
export const START_EDIT = '[ShopList] START_EDIT';
export const STOP_EDIT = '[ShopList] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  // payload ini ga wajib, dan namanya ga harus payload, yang wajib itu cmn diatas yaitu type
  constructor(public payload: Ingredient) {}
}
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  // payload ini ga wajib, dan namanya ga harus payload, yang wajib itu cmn diatas yaitu type
  constructor(public payload: Ingredient[]) {}
}
export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  // payload ini ga wajib, dan namanya ga harus payload, yang wajib itu cmn diatas yaitu type
  constructor(public payload: Ingredient) {}
}
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type TheActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
