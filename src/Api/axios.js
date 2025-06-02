import axios from "axios";

export const axiosInstance = axios.create({
  // local Instance of firebase function
  baseURL: "http://127.0.0.1:5001/clone-d1763/us-central1/api", // local Firebase functions

  // Deployment version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-jspm.onrender.com",
});
