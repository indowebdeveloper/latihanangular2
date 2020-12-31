import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shpLstService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shpLstService.getIngredients();
    this.shpLstService.ingredientChanged.subscribe(
      (ings: Ingredient[]) => (this.ingredients = ings)
    );
  }
}
