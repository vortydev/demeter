type Account = {
    accName: string;
    accPassword: string;
    roleId: Number;
    stateId: Number;
}

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
    //id: Number;
    vendorName: String;
    phone: String;
    email: String;
    address: String;
}

export type { Account, News, Task, Product, Category, Vendor }
