import { getApiClient } from "./axios";
import {parseCookies, setCookie} from 'nookies'
import Router from "next/router"

export const api = getApiClient()

const {'cosmos.refreshToken': refresh_token} = parseCookies()

async function renewToken() {
  try {
      const response = await api.post('/auth/refreshToken', {
        headers: {
          "RefreshToken": refresh_token
        }
      })
      const {accessToken, refreshToken} = response.data
      return {accessToken, refreshToken}
  } catch (error) {
      console.log(error);
  }
}

api.interceptors.request.use( response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await renewToken();
        setCookie(undefined, 'cosmos.refreshToken', newToken?.refreshToken)
        api.defaults.headers['Authorization'] = `Bearer ${newToken?.accessToken}`;
        return api(originalRequest);
      } catch (error) {
        Router.push('/user/login')
        throw error;
      }
    }
    if(error.response.status === 400){
      return Router.push('/usuario/entrar')
    }
    return Promise.reject(error);
  })