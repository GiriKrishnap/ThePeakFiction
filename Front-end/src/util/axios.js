import axios from 'axios';
import { baseUrl } from './constants';

const instance = axios.create({
    baseURL: baseUrl,
})

instance.interceptors.request.use(
    (config) => {

        let token = localStorage.getItem('token');

        if (!token) {
            const AdminToken = localStorage.getItem('AdminToken');
            token = AdminToken
        }
        console.log("userToken - ", localStorage.getItem('token'), '\n Admin token - ', localStorage.getItem('AdminToken'))
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default instance