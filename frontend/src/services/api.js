import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post('/auth/login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getBlogs = async () => {
    const response = await api.get('/blogs');
    return response.data;
};

export const getBlogById = async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data;
};

export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
};

export default api;
