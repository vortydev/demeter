import http from "../http-common";
import { Vendor } from "../types/Types";

class VendorService {
    getAll() {
        return http.get<Array<Vendor>>("/vendors");
    }
    
    create(data: Vendor){
        return http.post<Vendor>("/vendors", data);
    }

    update(data: Vendor, id: any){
        return http.put<any>(`/vendors/${id}`,data);
    }

    delete(id: any){
        return http.delete<any>(`/vendors/${id}`);
    }
}

export default new VendorService();