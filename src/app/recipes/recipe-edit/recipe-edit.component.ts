import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './../recipe-list/recipe.model';
import { RecipeService } from './../recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private rcpSrvc: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    console.log('form instatiate');
    let recipe: Recipe; // ini nilainya null, sehingga yang dibawah harus dikasi tanda ?, untuk menghilangkan error apabila bukan edit mode
    let rcpIngredients = new FormArray([]);
    if (this.editMode) {
      const loadedRecipe = this.rcpSrvc.getRecipe(this.id);
      recipe = loadedRecipe;
      if (recipe['ingredients']) {
        recipe['ingredients'].forEach((ing: Ingredient) => {
          rcpIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.min(1),
              ]),
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      id: new FormControl(recipe?.id), // ini tanda tanya yang dimaksud diatas. Ini namanya safe operator
      name: new FormControl(recipe?.name, Validators.required),
      imagePath: new FormControl(recipe?.imagePath, Validators.required),
      description: new FormControl(recipe?.description, Validators.required),
      ingredients: rcpIngredients,
    });
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.rcpSrvc.updateRecipe(this.recipeForm.value);
    } else {
      this.rcpSrvc.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }
  deleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
