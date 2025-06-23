import axios from 'axios';

const BASE_URL = 'https://whatsapp.olivaclinic.com';

// Create axios instance with default config
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth related API calls
export const authApi = {
    login: async (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axios.post(`${BASE_URL}/token`, formData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/user/me');
        return response.data;
    },

    signup: async (userData)  => {
    const response = await api.post('/user/', userData);
    return response.data;
},

logout: () => {
    localStorage.removeItem('access_token');
},
};