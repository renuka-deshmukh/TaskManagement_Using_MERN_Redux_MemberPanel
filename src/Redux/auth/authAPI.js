import apiClient from "../../apis/apiClient";

export const login = (data) =>
    apiClient.post('/user/login', data);

export const register = (data) => apiClient.post("/user/register", data);

export const getCurrentUser = () => apiClient.get('/user/getUserInfo')

export const uploadAvatar = (data) =>
  apiClient.put("/user/update-avatar", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
