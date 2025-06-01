// import axios from "axios";
// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:5001/clone-d1763/us-central1/api",
// });
// export { axiosInstance };
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-d1763/us-central1/api", // local Firebase functions
});
