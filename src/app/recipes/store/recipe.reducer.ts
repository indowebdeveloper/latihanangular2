import { Recipe } from './../recipe-list/recipe.model';
import * as RecipesAction from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};
export function recipeReducer(
  state = initialState,
  action: RecipesAction.TheActions
) {
  switch (action.type) {
    case RecipesAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipesAction.ADD_RECIPE:
      const id =
        state.recipes.length > 0
          ? Math.max.apply(
              Math,
              this.recipes.map(function (o) {
                return o.id;
              })
            ) + 1
          : 1;
      let addedRecipe = { ...action.payload };
      addedRecipe.id = id;
      return {
        ...state,
        recipes: [...state.recipes, addedRecipe],
      };
    case RecipesAction.DEL_RECIPE:
      const delIndex = state.recipes.findIndex(
        (obj) => obj.id == action.payload
      );
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== delIndex;
        }),
      };
    case RecipesAction.UPDATE_RECIPE:
      const updateIndex = state.recipes.findIndex(
        (obj) => obj.id == action.payload.index
      );
      console.log(updateIndex);
      const updatedRecipe = {
        ...state.recipes[updateIndex],
        ...action.payload.newRecipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[updateIndex] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    default:
      return state;
  }
}
