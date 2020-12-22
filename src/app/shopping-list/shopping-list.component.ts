import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Jengkol', 5),
    new Ingredient('Pete', 2),
  ];
  constructor() {}

  ngOnInit(): void {}

  onIngredientAdded(ing: Ingredient) {
    this.ingredients.push(ing);
  }
}
