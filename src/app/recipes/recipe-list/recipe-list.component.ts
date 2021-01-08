import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subs: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.recipes = this.rcpService.getRecipes(); // kita tetep butuh subscribe, karena model recipes nya kan di outsource
    // this.rcpService.recipesChanged.subscribe(
    //   (rcps: Recipe[]) => (this.recipes = rcps)
    // );
    this.subs = this.store
      .select('recipes')
      .pipe(
        map((rcpsState) => {
          return rcpsState.recipes;
        })
      )
      .subscribe((rcps) => (this.recipes = rcps));
  }

  newRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subs.unsubscribe();
  }
}
