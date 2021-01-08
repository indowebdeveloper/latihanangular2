import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RecipeService } from './../recipes.service';
import { Recipe } from './../recipe-list/recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromRoot from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(
    private rcpService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit(): void {
    // this.recipe = this.rcpService.getRecipe(+this.route.snapshot.params['id']);
    this.route.params.subscribe((params: Params) => {
      this.store
        .select('recipes')
        .pipe(
          map((rcpsState) => {
            return rcpsState.recipes;
          })
        )
        .subscribe((rcps) => {
          this.recipe = rcps.find((obj) => obj.id == +params['id']);
        });
    });
  }

  addToShoppingList() {
    this.rcpService.addToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    // this.rcpService.deleteRecipe(this.recipe.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipe.id));
    // navigate
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
