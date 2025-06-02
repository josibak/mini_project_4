// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  "http://localhost:8081/api",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 시 토큰 자동 삽입
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
