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

}

type Task = {
    id : Number;
    title: String;
    description : String;
    taskType: number;
    parentId: number|null;
    completed: boolean;
    picture: string | null;
    date: string;
}

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
