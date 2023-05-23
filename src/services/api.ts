import axios from "axios";
import Router from "next/router";
import {
  getRefreshTokenUser,
  getTokenUser,
  setTokenUser,
} from "../context/AuthProvider/util";

const URL = "http://18.222.112.130:8080";

export const api = axios.create({
  baseURL: `${URL}/api`,
});

axios.interceptors.request.use(
  (config: any) => {
    const { accessToken } = getTokenUser();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      Router.push("/usuario/entrar");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = getRefreshTokenUser();
      return api
        .post("/auth/refreshToken", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            setTokenUser(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + getTokenUser();
            return axios(originalRequest);
          }
        });
    }
  }
);
