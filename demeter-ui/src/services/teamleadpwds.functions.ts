import TLPService from "./teamleadpwds.services";


async function getPasswordFor(name: string) {
    const pw = TLPService.getPasswordFor(name)
      .then((response: any) => {
        return response.data;
      })
      .catch((e: Error) => {
        console.log(e);
        return "";
      });
    return pw;
  }

  export {getPasswordFor}
  