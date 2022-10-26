import http from "../http-common";
import { Product, Category, Mesurement } from "../types/Types";

class InventoryService {
  getAll() {
    return http.get<Array<Product>>("/products");
  }

  getProduct(id: any) {
    return http.get<Product>(`/products/${id}`);
  }

  getByCategory(categoryId: string) {
    return http.get<Array<Product>>(`/products?categoryId=${categoryId}`);
  }

  create(data: Product) {
    return http.post<Product>("/products", data);
  }

  update(data: Product, id: any) {
    return http.put<any>(`/products/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/products/${id}`);
  }

  getAllCategories() {
    return http.get<Array<Category>>("/categories/products");
  }

  getCategory(id: string) {
    return http.get<Category>(`/categories/products/${id}`);
  }

  getAllMesurements() {
    return http.get<Array<Mesurement>>("/categories/mesurements");
  }
  getMesurement(id: string) {
    return http.get<Mesurement>(`/categories/mesurements/${id}`);
  }
}

export default new InventoryService();
