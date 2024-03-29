type Account = {
  accName: string;
  accPassword: string;
  roleId: number;
  stateId: Number;
};

type News = {
  id: number;
  title: string;
  description: string;
  author: string;
  active: boolean;
  roleId: string;
  taskId: number;
  date: Date;
  priority: boolean;
  receiver: string;
}

type Task = {
  id: number;
  title: string;
  description: string;
  categorytaskId: number;
  parentId: number;
  completed: boolean;
  active: boolean;
  responsable: string;
  date: Date;
  priority: boolean;
  receiver: string;
  taskMaster: string;
  whenToDo: string;
}

type TaskHistory = {
  completionDate: Date;
  taskName: string;
  whoDid: string;
  parentId: number;
  categorytaskId: number;
  receiver: string;
  ogTaskId: number;
  whenToDo: string;
}

type Recipe = {
  id: number;
  title: string;
  categoryrecipeId: number;
  instruction: string;
  otherCost: number;
  nbUnitCreated: number;
  available: boolean;
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
  vendor: string;
  phone: string;
  email: string;
  address: string;
}

type Mesurement = {
  id: number;
  mesurement: string;
  weight: number;
}

type Ingredient = {
  recipeId: number;
  productId: number;
  qty: number;
  mesurementId: number;
}

type Role = {
  id: number;
}

export type { Account, News, Task, Product, Category, Recipe, Vendor, Mesurement, Ingredient, TaskHistory, Role }
