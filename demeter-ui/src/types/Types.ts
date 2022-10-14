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

type IngForRecipe ={
    ingredient: Product;
    quantity : number;
}

type Product = {
    id: Number;
    prodName: String;
    price: Number;
    qtyInv: Number;
    qtyUnit: Number;
    format: String;
    mesurementId: number;
    categoryId: number;
    vendorId: number;

}


type Category = {
    id: Number;
    catName: String;
}

type Vendor = {
    //id: Number;
    vendorName: String;
    phone: String;
    email: String;
    address: String;
}

export type { Account, News, Task, Product, Category, Vendor, Recipe, RawRecipe, IngForRecipe  }


