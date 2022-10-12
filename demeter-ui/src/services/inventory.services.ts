import http from "../http-common";
import { Category } from "../types/Types";

class InventoryService {


    getCategory(id: string) {
        return http.get<Category>(`/products/category/${id}`);
    }

}

export default new InventoryService();