import axios, { AxiosInstance } from "axios";

// const baseUrl = process.env.REACT_APP_API_URL;
const storage = localStorage.getItem("userToken");
const user = storage ? JSON.parse(storage) : {};
const api: AxiosInstance = axios.create({
  baseURL: "https://app.yoiu.io",
  headers: {
    "content-type": "application/json",
  },
});

export const subscribeToApp = async (email: string) => {
  return await api.post("/api/email/subscribe", {
    email,
  });
};

export const subscribeToProject = async (email: string, name: string) => {
  return await api.post(`/api/email/subscribe?ido=${name}`, {
    email,
    ido: name,
  });
};
