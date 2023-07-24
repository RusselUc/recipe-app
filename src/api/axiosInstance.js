import axios from 'axios';

const API = 'http://192.168.1.85:8000/api';

const axiosInstance = axios.create({
    baseURL: API,
});

export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

export default axiosInstance;