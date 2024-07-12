
import axios from 'axios';

const API_BASE_URL = 'https://quco.ysk.co.in';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// 167.71.231.139

export const token = localStorage.getItem('token'); 


apiService.interceptors.request.use(
  (config) => {
 
    const token = localStorage.getItem('token'); 
  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('Request Config:', config);

    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error.response); // Log response errors
    return Promise.reject(error);
  }
);


export default apiService;