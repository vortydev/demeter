type Account = {
    name: string;
    role: string;
    password: string;
    id: Number;
}

type News ={
    id: Number;
    title : string;
    description : string;
    author: string;
    picture: string | null;
}

export type {Account, News}