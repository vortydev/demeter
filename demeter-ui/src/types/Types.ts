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

type Category = {
    id: Number;
    catName: String;
}

type Vendor = {
    id: Number;
    vendorName: String;
    phone: String;
    email: String;
    address: String;
}

export type { Account, News, Task, Category, Vendor }