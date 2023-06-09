import axios from "axios";
import { parseCookies } from "nookies";

export function getApiClient(ctx?: any){
  const {'cosmos.token': token} = parseCookies(ctx)

 const api = axios.create({
  baseURL: "https://cosmos-social.cyclic.app/api",
});

if(token){
   api.defaults.headers['Authorization'] = `Bearer ${token}` 
}

return api

}