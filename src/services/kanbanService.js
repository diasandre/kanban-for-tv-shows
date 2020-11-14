import axios from "axios";
import { API_BASE_URL, kanban } from "../constants/apiRoutes";

axios.interceptors.request.use((config) => {
  const token = 12345; 
  config.headers.Authorization = token;
  return config;
});

export const load = ({ _id: id }) =>
  axios.get(`${API_BASE_URL}${kanban.BASE}${kanban.LOAD_BY_USER}${id}`);
