import axios from "axios";

const API = axios.create({
  baseURL: "https://clens.onrender.com/api"
});

export default API;
