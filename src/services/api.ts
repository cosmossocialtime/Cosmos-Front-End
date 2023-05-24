import axios from "axios";
import {parseCookies} from 'nookies'

const {'cosmos.token': token} = parseCookies()

export const api = axios.create({
  baseURL: "http://18.222.112.130:8080/api",
});


if(token){
   api.defaults.headers['Authorization'] = `Bearer ${token}` 
}
