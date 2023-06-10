import { api } from "./api"
import {axiosPrivate} from "./axios"
import {parseCookies} from 'nookies'
import Router from "next/router"

const {'cosmos.refreshToken': refresh_token} = parseCookies()

async function renewToken() {
  try {
      const response = await api.post('/auth/refreshToken', {
        headers: {
          "RefreshToken": refresh_token
        }
      })
      const newToken = response.data.accessToken
      return newToken
  } catch (error) {
      console.log(error);
  }
}

axiosPrivate.interceptors.request.use( response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await renewToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        Router.push('/usuario/entrar')
        throw error;
      }
    }
    return Promise.reject(error);
  })