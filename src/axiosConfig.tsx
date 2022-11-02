import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  }, 
  (error) => {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) 
      ? error.response.data.message 
      : error.statusText ? 
        error.statusText : 
        error.message ? error.message : 'Unknown Error'
    );
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  }, 
  (error) => {
    process.env.NODE_ENV === 'production' && console.clear();
    throw new Error(
      (error.response && error.response.data && error.response.data.message) 
      ? error.response.data.message 
      : error.statusText ? 
        error.statusText : 
        error.message ? error.message : 'Unknown Error'
    );
  }
);

export default axios;