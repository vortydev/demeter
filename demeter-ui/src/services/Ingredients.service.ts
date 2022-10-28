import http from "../http-common";
import { Ingredient } from "../types/Types";

class IngredientService {
  getAll() {
    return http.get<Array<Ingredient>>("/rpr");
  }

  getByRecipe(recipeId: number){
    return http.get<Ingredient>(`/rpr?recipeId=${recipeId}`);
  }

  create(data: Ingredient) {
    return http.post<Ingredient>("/rpr", data);
  }

  update(data: Ingredient,recipeId: number, productId: number) {
    return http.put<any>(`/rpr?recipeId=${recipeId}&productId=${productId}`, data);
  }

  delete(recipeId: number, productId: number) {

    return http.delete<any>(`/rpr?recipeId=${recipeId}&productId=${productId}`);
  }
  deleteFromRecipe(recipeId: number) {

    return http.delete<any>(`/rpr?recipeId=${recipeId}`);
  }

  deleteAll() {
    return http.delete<any>(`/rpr`);
  }
}

export default new IngredientService();
