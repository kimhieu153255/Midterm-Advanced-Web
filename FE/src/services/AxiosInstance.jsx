import axios from 'axios';
import { useCookies } from 'react-cookie';

const createAxios = () => {
    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_BE_URL}v1/api/`,
        headers: {
            'Content-Type': 'application/json',
            timeout: 10000,
        },
    });
    const get = async (url, params) => {
        try {
            const res = await axiosInstance.get(url, params);
            return res;
        } catch (err) {
            console.log('Error: ', err);
            return err;
        }
    };

    const post = async (url, params) => {
        try {
            const res = await axiosInstance.post(url, params);
            return res;
        } catch (err) {
            console.log('Error: ', err);
            return err;
        }
    };
    const put = async (url, data, params) => {
        try {
            const res = await axiosInstance.put(url, data, params);
            return res;
        } catch (err) {
            console.log('Error: ', err);
            return err;
        }
    };
    return { get, post, put };
};

const axiosSingleton = createAxios();

export default axiosSingleton;
