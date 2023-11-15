import axios from 'axios';

const createAxios = () => {
    const axiosInstance = axios.create({
        baseURL: `http://localhost:20120/v1/api/`,
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
    return { get, post };
};

const axiosSingleton = createAxios();

export default axiosSingleton;
