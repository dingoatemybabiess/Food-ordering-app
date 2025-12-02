import axios from 'axios';

    // Create the axios instance connected to your backend
    const api = axios.create({
      baseURL: 'http://localhost:3000', // Matches your server.js port
    });

    // Add a "Interceptor" to attach the token to every request automatically
    api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    export default api;