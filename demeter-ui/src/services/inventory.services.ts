import http from "../http-common";
import { Product, Category } from "../types/Types";

class InventoryService {

    getAll(){
        return http.get<Array<Product>>("/products");
    }







    getAllCategories(){
        return http.get<Array<Category>>("/categories/products");
    }

    getCategory(id: string) {
        return http.get<Category>(`/categories/products/${id}`);
    }

}

export default new InventoryService();