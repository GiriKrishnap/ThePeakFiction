import axios from 'axios';
import { baseUrl } from './constants';

const instance = axios.create({
    baseURL: baseUrl,
})

instance.interceptors.request.use(
    (config) => {

        let token = ''

        const userToken = localStorage.getItem('token');
        const AdminToken = localStorage.getItem('AdminToken');

        if (userToken) {
            token = userToken
        } else {
            token = AdminToken
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance