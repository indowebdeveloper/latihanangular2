import { LoggingService } from './../logging.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
/** NgRx Stores */
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromRoot from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //ingredients: Ingredient[];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private ingredientSubs: Subscription;

  constructor(
    private logging: LoggingService,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shopList');
    // this.ingredients = this.shpLstService.getIngredients();
    // this.ingredientSubs = this.shpLstService.ingredientChanged.subscribe(
    //   (ings: Ingredient[]) => (this.ingredients = ings)
    // );
    // this.logging.printLog('Hello ShpListCompnent ngOnInit');
  }

  ngOnDestroy(): void {
    // this.ingredientSubs.unsubscribe();
  }

  onEdit(id: number) {
    // this.shpLstService.editIngredient(id);
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }
}
