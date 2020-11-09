import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.jikan.moe/v3/search",
});

export default instance;
