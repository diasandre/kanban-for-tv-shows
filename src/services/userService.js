import axios from "axios";
import { API_BASE_URL, user } from "../constants/apiRoutes";

axios.interceptors.request.use((config) => {
  const token = 12345;
  config.headers.Authorization = token;
  return config;
});

export const getOrCreate = ({ uid: id, displayName: name, email }) =>
  axios.post(`${API_BASE_URL}${user.BASE}${user.GET_OR_CREATE}`, {
    id,
    email,
    name,
  });
