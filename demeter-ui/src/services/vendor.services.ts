import http from "../http-common";
import { Vendor } from "../types/Types";

class VendorService {
    getAll() {
        return http.get<Array<Vendor>>("/vendors");
    }
    
    create(data: Vendor){
        return http.post<Vendor>("/vendors", data);
    }
}

export default new VendorService();