import axios from "axios";

export const api = axios.create({
  baseURL: "https://8ddc-18-222-112-130.ngrok-free.app/api",
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
