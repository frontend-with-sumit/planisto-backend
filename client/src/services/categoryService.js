import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/categories`;

export function getCategories() {
  return http.get(apiEndpoint);
}

export function getCategory(categoryId) {
  return http.get(`${apiEndpoint}/${categoryId}`);
}

export function saveCategory(category) {
  if (category._id) {
    const body = { ...category };
    delete body._id;

    return http.put(`${apiEndpoint}/${category._id}`, body);
  }

  return http.post(apiEndpoint, category);
}

export function deleteCategory(id) {
  return http.delete(`${apiEndpoint}/${id}`);
}
