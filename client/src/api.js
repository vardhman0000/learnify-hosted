import axios from 'axios';

// Create an axios instance that uses the VITE_API_URL from your environment
// It defaults to an empty string for local development to use the Vite proxy
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export default api;