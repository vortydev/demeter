import http from "../http-common";
import { Recipe } from "../types/Types";

class RecipeService {
  getAll() {
    return http.get<Array<Recipe>>("/recipes");
  }

  getByCategory(categoryId: number){
    return http.get<Recipe>(`/recipes?categoryrecipeId=${categoryId}`);
  }

  get(id: string) {
    return http.get<Recipe>(`/recipes/${id}`);
  }

  create(data: Recipe) {
    return http.post<Recipe>("/recipes", data);
  }

  update(data: Recipe, id: String) {
    return http.put<any>(`/recipes/${id}`, data);
  }

  delete(id: string) {
    return http.delete<any>(`/recipes/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/recipes`);
  }

}

export default new RecipeService();