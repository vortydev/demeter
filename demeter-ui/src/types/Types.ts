type Account = {
  accName: string;
  accPassword: string;
  roleId: Number;
  stateId: Number;
};

type News ={
    id: Number;
    title : string;
    description : string;
    author: string;
    picture: string | null;
    date: string;
}

type Task = {
  id: Number;
  taskName: String;
  description: String;
};

type Recipe = {
  id: number;
  recipeName: string;
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

export type { Account, News, Task, Product, Category, Recipe, Vendor, Mesurement }
