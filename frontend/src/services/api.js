import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['x-auth-token'] = token;
  return config;
});

export const getTasks = () => API.get('/tasks');
export const createTask = (task) => API.post('/tasks', task);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);