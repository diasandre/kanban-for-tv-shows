import axios from "axios";
import { API_BASE_URL, user } from "../constants/apiRoutes";

export const getOrCreate = (token) =>
  axios.get(`${API_BASE_URL}${user.BASE}${user.GET_OR_CREATE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
