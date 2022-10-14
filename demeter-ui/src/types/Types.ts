type Account = {
    // id: Number;
    accName: string;
    accPassword: string;
    roleId: Number;
    stateId: Number;
}

type News ={
    id: Number;
    title : string;
    description : string;
    author: string;
    picture: string | null;
}

type Task = {
id : Number;
taskName: String;
description : String;
}

type Product = {
    id: Number;
    prodName: String;
    price: Number;
    qtyInv: Number;
    qtyUnit: Number;
    format: String;
}

type Category = {
    id: Number;
    catName: String;
}

type Vendor = {
    id: number;
    name: String;
    phone: String;
    email: String;
    address: String;
}

export type { Account, News, Task, Product, Category, Vendor }