import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/create', data);
export const updateUser = (data) => api.put('/user/update', data);
export const updatePassword = (data) => api.put('/user/update-password', data);
export const getUserById = (id) => api.post(`/user/id`, { id });
export const getAllUsers = () => api.get('/user/all');
export const deleteUser = (id) => api.delete('/user/delete', { data: { id } });

export default api;