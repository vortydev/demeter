import http from "../http-common";
import { Category } from "../types/Types";

class InventoryService {

    getAllCategories(){
        return http.get<Array<Category>>("/products/category");
    }

    getCategory(id: string) {
        return http.get<Category>(`/products/category/${id}`);
    }

}

export default new InventoryService();