import api from "./api";

interface LoginPayload {
  username: string;
  password: string;
}

export const loginService = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
