type Account = {
  accName: string;
  accPassword: string;
  roleId: Number;
  stateId: Number;
};

type News ={
    title : string;
    description : string;
    author: string;
    img: string | null;
    active: boolean;
    roleId: string;
    taskId: number | null;
    picture: string | null;
    date: Date;

}

type Task = {
    id : number;
    title: String;
    description : String;
    categorytaskId: number;
    parentId: number|null;
    completed: boolean;
    active: boolean;
    picture: string | null;
    date: Date;
}

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
    name: string;
    categoryproductId: string;
    vendorId: string;
    price: string;
    qtyInv: string;
    qtyUnit: string;
    format: string;
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
