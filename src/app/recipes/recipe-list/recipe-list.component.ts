import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private rcpService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.rcpService.getRecipes(); // kita tetep butuh subscribe, karena model recipes nya kan di outsource
    this.rcpService.recipesChanged.subscribe(
      (rcps: Recipe[]) => (this.recipes = rcps)
    );
  }

  newRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
