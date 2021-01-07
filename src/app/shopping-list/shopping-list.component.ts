import { LoggingService } from './../logging.service';
import { logging } from 'protractor';
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
  constructor(
    private shpLstService: ShoppingListService,
    private logging: LoggingService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shpLstService.getIngredients();
    this.ingredientSubs = this.shpLstService.ingredientChanged.subscribe(
      (ings: Ingredient[]) => (this.ingredients = ings)
    );
    this.logging.printLog('Hello ShpListCompnent ngOnInit');
  }

  ngOnDestroy(): void {
    this.ingredientSubs.unsubscribe();
  }

  onEdit(id: number) {
    this.shpLstService.editIngredient(id);
  }
}
