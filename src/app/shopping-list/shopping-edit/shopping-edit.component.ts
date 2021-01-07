import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  index: number;
  editSubscription: Subscription;
  item: Ingredient;
  @ViewChild('f') theForm: NgForm;
  constructor(private shpLstService: ShoppingListService) {}

  ngOnInit(): void {
    this.editSubscription = this.shpLstService.goEdit.subscribe(
      (index: number) => {
        this.index = index;
        this.item = this.shpLstService.getIngredient(index);
        this.theForm.setValue(this.item);
      }
    );
  }

  onAddItem(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.index != null) {
      this.shpLstService.updateIngredient(newIngredient, this.index);
    } else {
      this.shpLstService.addIngredient(newIngredient);
    }
    // reset the form
    this.resetForm();
  }
  deleteIng() {
    this.shpLstService.deleteIng(this.index);
    this.resetForm();
  }
  resetForm() {
    this.index = null;
    this.theForm.reset();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.editSubscription.unsubscribe();
  }
}
