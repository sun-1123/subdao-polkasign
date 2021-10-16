import axios from "axios";

const instance = axios.create({
  headers: {
    "x-requested-with": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded",
  },
  timeout: 5000,
  //apibaseURL
  baseURL: "http://47.245.60.208:3300",
});

instance.interceptors.request.use(
  (request) => {
    // before request
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
