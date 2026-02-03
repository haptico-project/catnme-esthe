import axios from "axios";

const isHandlerEnabled = (config: any) => {
  // eslint-disable-next-line no-prototype-builtins
  return !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);
};

// axiosInstance.get('/v2/api-endpoint', { handlerEnabled: false })
const instance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_CHECKOUT_SERVER,
});

const requestHandler = (request: any) => {
  if (isHandlerEnabled(request)) {
    // NOP
    // console.log("Request Interceptor", request);
  }
  return request;
};

const errorHandler = (error: any) => {
  if (isHandlerEnabled(error.config)) {
    // console.log("Error Interceptor", error);
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // NOP
      }
    }
  }
  // return Promise.reject({...error});
  return error;
};

const successHandler = (response: any) => {
  if (isHandlerEnabled(response.config)) {
    // NOP
    // console.log("Response Interceptor", response);
  }
  return response;
};

instance.interceptors.request.use((request: any) => requestHandler(request));
instance.interceptors.response.use(
  (response: any) => successHandler(response),
  (error: any) => errorHandler(error)
);

export default instance;
