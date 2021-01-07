import { SharedModule } from './../shared/shared.module';
import { RecipesRoutingModule } from './recipes-route.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NoSelectedRecipeComponent } from './no-selected-recipe/no-selected-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    NoSelectedRecipeComponent,
    RecipeEditComponent,
  ],
  imports: [RecipesRoutingModule, SharedModule, ReactiveFormsModule],
})
export class RecipesModule {}
