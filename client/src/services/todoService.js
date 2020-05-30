import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/todos`;

export function getTodos() {
  return http.get(apiEndpoint);
}

export function getTodo(todoId) {
  return http.get(`${apiEndpoint}/${todoId}`);
}

export function saveTodo(todo) {
  if (todo._id) {
    const body = { ...todo };
    delete body._id;

    return http.put(`${apiEndpoint}/${todo._id}`, body);
  }

  return http.post(apiEndpoint, todo);
}

export function deleteTodo(todoId) {
  return http.delete(`${apiEndpoint}/${todoId}`);
}
