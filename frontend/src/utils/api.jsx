import axios from 'axios';

const api = axios.create({
  // Use the environment variable if it exists, otherwise fallback to local
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Note: Ensure your backend is configured to read 'x-auth-token'
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;