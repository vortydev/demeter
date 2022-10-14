type Account = {
  accName: string;
  accPassword: string;
  roleId: Number;
  stateId: Number;
};

type News = {
  id: Number;
  title: string;
  description: string;
  author: string;
  picture: string | null;
};

type Task = {
  id: Number;
  taskName: String;
  description: String;
};

type Recipe = {
  id: number;
  recipeName: string;
};

type RawRecipe ={
    title : string;
    category : number;
    instructions : string;
    otherCost: number;
    nbProductCreated: number;
}

type Ingredient={
id: number;
ingName: string;

}

type IngForRecipe ={
    ingredient: Ingredient;
    quantity : number;
}

export type { Account, News, Task, Recipe, RawRecipe, Ingredient, IngForRecipe };
