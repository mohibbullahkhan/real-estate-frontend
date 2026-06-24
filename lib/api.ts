import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
});

// Helper to determine if a request needs the Authorization header
const isProtectedRequest = (url: string = '', method: string = 'GET') => {
  const upperMethod = method.toUpperCase();

  // Auth protected endpoints
  if (url.includes('/api/auth/me') || url.includes('/api/auth/change-password')) {
    return true;
  }

  // Inquiries protected endpoints
  // GET is admin only, PATCH/DELETE are admin only
  if (url.includes('/api/inquiries')) {
    if (upperMethod === 'GET' || upperMethod === 'PATCH' || upperMethod === 'DELETE') {
      return true;
    }
  }

  // Properties protected endpoints
  // POST, PUT, PATCH, DELETE are admin only
  if (url.includes('/api/properties')) {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(upperMethod)) {
      return true;
    }
  }

  return false;
};

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined' && isProtectedRequest(config.url, config.method)) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
