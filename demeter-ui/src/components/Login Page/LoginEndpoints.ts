import { Account } from "src/Types";

type LoginResponse = {
    name: string;
    permission: string;
  };

async function validateLogin(accountName:string, password: string){
    try {
        // 👇️ const response: Response
        const response = await fetch('/login', {
          method: 'GET',
          body: JSON.stringify({
            name: accountName,
            password: password,
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
        const result = (await response.json()) as LoginResponse;
    
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
            name:'admin1',
            permission: 'admin',
            id: 4
        }
    ];
    return accountList;
}

export {validateLogin}