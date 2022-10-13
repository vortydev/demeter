import http from "../http-common";
import { Vendor } from "../types/Types";

class VendorService {
    getAll() {
        return http.get<Array<Vendor>>("/vendors");
    }
}

export default new VendorService();