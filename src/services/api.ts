import axios from "axios";

export const api = axios.create({
  baseURL: "https://277b-18-222-112-130.ngrok.io/api",
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});
