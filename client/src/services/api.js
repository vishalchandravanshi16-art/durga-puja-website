import axios from 'axios';

const API = axios.create({
  baseURL: 'https://durga-puja-app-2026.onrender.com/api'
});

// Attach JWT token to every request if available
API.interceptors.request.use(
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

export const fetchYears = () => API.get('/years');
export const fetchMembers = (year) => API.get(`/members/year/${year}`);
export const fetchFinancialSummary = (year) => API.get(`/expenses/summary/${year}`);
export const fetchExpenses = (year) => API.get(`/expenses/year/${year}`);
export const fetchIncome = (year) => API.get(`/incomes/year/${year}`);
export const fetchMurtiBari = () => API.get('/murti-bari');
export const fetchGallery = (year, category) => API.get(`/gallery?year=${year || ''}&category=${category || ''}`);

export const loginAdmin = (credentials) => API.post('/auth/login', credentials);
export const addExpenseApi = (data) => API.post('/expenses', data);
export const addIncomeApi = (data) => API.post('/incomes', data);
export const addMemberApi = (data) => API.post('/members', data);

export default API;