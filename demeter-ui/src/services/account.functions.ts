import AccountService from "./account.services";
import { Account } from "../types/Types";

function createAccount(data: Account): boolean {
    AccountService.create(data)
    // .then((response: any) => {
    //     this.setState({
    //         id: response.data.id,
    //         title: response.data.title,
    //         description: response.data.description,
    //         published: response.data.published,
    //         submitted: true
    //     });
    //     console.log(response.data);
    // })
    .catch((e: Error) => {
        console.log(e);
        return false;
    });
    return true;
}

export { 
    createAccount,
};