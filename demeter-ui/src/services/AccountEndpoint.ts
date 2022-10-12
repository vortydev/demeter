import { Account } from "../types/Types";

type CreateAccountResponse = {
    name: string;
    role: string;
    password: string;
    id: Number;
  };

async function createAccount(accountName:string, password: string, role : Number){
    try {
        // 👇️ const response: Response
        const response = await fetch('/accounts', {
          method: 'POST',
          body: JSON.stringify({
            name: accountName,
            password: password,
            role: role
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
    
        // 👇️ const result: CreateUserResponse
        const result = (await response.json()) as CreateAccountResponse;
    
        console.log('result is: ', JSON.stringify(result, null, 4));
    
        return result;
      } catch (error) {
        if (error instanceof Error) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }

}



// this function is to be edited, it's a fake right now
function getAccounts(role: string) : Account[]{
const getmethis = role;
    const accountList: Account[] = [
        {
            accName:'admin1',
            accPassword: '134',
            roleId: 1,
            stateId: 2
        }
    ];
    return accountList;
}

export {createAccount, getAccounts}