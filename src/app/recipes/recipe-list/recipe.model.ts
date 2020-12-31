import { Ingredient } from './../../shared/ingredient.model';
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public id: number;

  constructor(
    id: number,
    name: string,
    desc: string,
    imagePath: string,
    ings: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ings;
  }
}
