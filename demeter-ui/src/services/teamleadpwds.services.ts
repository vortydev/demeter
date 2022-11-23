import http from "../http-common";
import { TLP} from "../types/Types";

class TLPService {
    getPasswordFor(name: string) {
        return http.get<TLP>(`/teamleadpwd/${name}`);
      }
    
}

export default new TLPService();