import axios from 'axios';
import { baseUrl } from './constants';

const instance = axios.create({
    baseURL: baseUrl,
})

instance.interceptors.request.use(config => {
    return config;
})

export default instance