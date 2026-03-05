import { http } from "./http";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "../types/user";

const base = "/api/v1/users";

export const UsersService = {
  list: () => http<UserResponse[]>(base),
  get: (id: number) => http<UserResponse>(`${base}/${id}`),
  create: (payload: UserCreateRequest) =>
    http<UserResponse>(base, { method: "POST", body: JSON.stringify(payload) }),
  update: (id: number, payload: UserUpdateRequest) =>
    http<UserResponse>(`${base}/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id: number) => http<void>(`${base}/${id}`, { method: "DELETE" }),
};
