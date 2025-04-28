import axios from "axios";
import type { TypeResponse } from "../TypeResponse";
import type { GetUser } from "./response/GetUserResponse";
import type { DeleteUserResponse } from "./response/DeleteUserResponse";

const BASE_URL = "http://localhost:3000/user";

export const userService = {
  getAllUser: async (): Promise<TypeResponse<GetUser[]>> => {
    try {
      const response = await axios.get<TypeResponse<GetUser[]>>(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getUserById: async (id: number): Promise<TypeResponse<GetUser>> => {
    try {
      const response = await axios.get<TypeResponse<GetUser>>(
        `${BASE_URL}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  addUser: async (user: GetUser): Promise<TypeResponse<GetUser>> => {
    try {
      const response = await axios.post<TypeResponse<GetUser>>(BASE_URL, user);
      return response.data;
    } catch (error) {
      console.error(`Error add user:`, error);
      throw error;
    }
  },

  updateUser: async (
    id: number,
    user: GetUser
  ): Promise<TypeResponse<GetUser>> => {
    try {
      const response = await axios.put<TypeResponse<GetUser>>(
        `${BASE_URL}/${id}`,
        user
      );
      return response.data;
    } catch (error) {
      console.error(`Error update user with id ${id}:`, error);
      throw error;
    }
  },

  deleteUserById: async (
    id: number
  ): Promise<TypeResponse<DeleteUserResponse>> => {
    try {
      const response = await axios.delete<TypeResponse<DeleteUserResponse>>(
        `${BASE_URL}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error delete user with id ${id}:`, error);
      throw error;
    }
  },
};
