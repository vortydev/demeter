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
  title : string;
  categoryrecipeId : number;
  instruction : string;
  otherCost: number;
  nbUnitCreated: number;
  available:boolean;
};

type Product = {
    id: number;
    name: String;
    categoryproductId: string;
    vendorId: string;
    price: string;
    qtyInv: string;
    qtyUnit: string;
    format: String;
    mesurementId: string;
}

type Category = {
    id: number;
    category: String;
}

type Vendor = {
    id: number;
    vendor: String;
    phone: String;
    email: String;
    address: String;
}

type Mesurement = {
    id: number;
    mesurement: string;
    weight: number;
}

type Ingredient ={
  recipeId: number;
  productId: number;
  qty: number;
  mesurementId: number;
}

export type { Account, News, Task, Product, Category, Recipe, Vendor, Mesurement, Ingredient }
