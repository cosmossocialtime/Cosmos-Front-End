import axios from "axios";

export const api = axios.create({
  baseURL: "http://18.222.112.130:8080/api",
  // headers: {
  //   "ngrok-skip-browser-warning": true,
  // },
});
