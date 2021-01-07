import { RecipeService } from './../recipes.service';
import { Recipe } from './../recipe-list/recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('its from detail');
    // this.recipe = this.rcpService.getRecipe(+this.route.snapshot.params['id']);
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.rcpService.getRecipe(+params['id']);
    });
  }

  addToShoppingList() {
    this.rcpService.addToShoppingList(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.rcpService.deleteRecipe(this.recipe.id);
    // navigate
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
