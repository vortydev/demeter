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
    id: number;
    name: String;
    category: string;
    vendor: string;
    price: string;
    qtyInv: string;
    qtyUnit: string;
    format: String;
    mesurement: string;
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

export type { Account, News, Task, Product, Category, Vendor }