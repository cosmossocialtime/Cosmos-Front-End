import axios from "axios";
import { parseCookies } from "nookies";
import { api } from "./api";

const BASE_URL = "https://cosmos-social.cyclic.app/api"

export function getApiClient(ctx?: any){
  const {'cosmos.token': token} = parseCookies(ctx)

 const api = axios.create({
  baseURL: BASE_URL,
});

if(token){
   api.defaults.headers['Authorization'] = `Bearer ${token}` 
}
return api
}

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
}) 
