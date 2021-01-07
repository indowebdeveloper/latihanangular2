import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubs: Subscription;
  constructor(private shpLstService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shpLstService.getIngredients();
    this.ingredientSubs = this.shpLstService.ingredientChanged.subscribe(
      (ings: Ingredient[]) => (this.ingredients = ings)
    );
  }

  ngOnDestroy(): void {
    this.ingredientSubs.unsubscribe();
  }

  onEdit(id: number) {
    this.shpLstService.editIngredient(id);
  }
}
