import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = async (username, password) => {
    const response = await api.post('/login/', { username, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ username }));
    }
    return response.data;
};

export const signup = async (username, email, password) => {
    const response = await api.post('/signup/', { username, email, password });
    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get('/expenses/');
    return response.data;
};

export const addExpense = async (expenseData) => {
    const response = await api.post('/expenses/', expenseData);
    return response.data;
};

export const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}/`);
};

export default api;
