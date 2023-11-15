import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axiosSingleton from '../services/AxiosInstance';

const Login = () => {
    const [cookies, setCookies] = useCookies(['token']);
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (cookies.token != null) {
            navigate('/');
        }
    }, [cookies.token, navigate]);

    const onChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async e => {
        // Validate
        if (data.username === '' || data.password === '') {
            setError('Username and password cannot be empty');
            return;
        }
        try {
            const res = await axiosSingleton.post('login', data);
            if (res.status === 200) {
                const token = res?.data?.metadata?.token;
                setCookies('token', token);
                navigate('/');
            } else {
                let message = res?.response?.data?.message;
                setError(message);
                console.log('Error register: ', message);
            }
        } catch (err) {
            console.log('Error: ', err);
            setError(err);
        }
    };

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='sm:w-2/6 w-3/5 mx-auto bg-gray-100 shadow-md sm:p-16 p-10 border rounded-md'>
                <h1 className='text-center font-bold text-3xl mb-5'>Login</h1>
                <div className='flex flex-col gap-2 py-1'>
                    <label htmlFor='username' className='font-semibold'>
                        Username
                    </label>
                    <input
                        type='username'
                        name='username'
                        id='username'
                        className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                        onChange={onChangeInput}
                        required
                    />
                </div>
                <div className='flex flex-col gap-2 py-1'>
                    <label htmlFor='password' className='font-semibold'>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                        onChange={onChangeInput}
                        required
                    />
                </div>
                {error && <div className='text-red-500 text-sm font-semibold'>{error}</div>}
                <div className='flex flex-col pt-10'>
                    <button
                        onClick={handleSubmit}
                        className='bg-green-500 text-white rounded-md p-2 hover:bg-green-600 text-md font-semibold transition-all'
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
