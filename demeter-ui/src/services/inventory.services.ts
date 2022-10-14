import http from "../http-common";
import { Product, Category } from "../types/Types";

class InventoryService {

    getAll(){
        return http.get<Array<Product>>("/products");
    }

    getByCategory(category: number){
        return http.get<Product>(`/products?categoryId=${category}`);
      }

    getAllCategories(){
        return http.get<Array<Category>>("/products/category");
    }

    getCategory(id: string) {
        return http.get<Category>(`/products/category/${id}`);
    }

}

export default new InventoryService();