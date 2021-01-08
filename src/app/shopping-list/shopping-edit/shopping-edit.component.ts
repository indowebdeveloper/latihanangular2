import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromRoot from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // index: number;
  editSubscription: Subscription;
  item: Ingredient;
  editMode = false;
  @ViewChild('f') theForm: NgForm;
  constructor(private store: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this.editSubscription = this.store
      .select('shopList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          // this.index = stateData.editedIngredientIndex;
          this.item = stateData.editedIngredient;
          this.theForm.setValue(this.item);
        } else {
          this.editMode = false;
        }
      });
    // this.editSubscription = this.shpLstService.goEdit.subscribe(
    //   (index: number) => {
    //     this.index = index;
    //     this.item = this.shpLstService.getIngredient(index);
    //     this.theForm.setValue(this.item);
    //   }
    // );
  }

  onAddItem(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode == true) {
      // this.shpLstService.updateIngredient(newIngredient, this.index);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      // this.shpLstService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    // reset the form
    this.resetForm();
  }
  deleteIng() {
    // this.shpLstService.deleteIng(this.index);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.resetForm();
  }
  resetForm() {
    this.editMode = false;
    this.theForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
