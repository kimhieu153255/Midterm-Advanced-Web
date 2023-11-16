import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axiosSingleton from '../services/AxiosInstance';
import InputLabelField from '../components/InputField';

const Login = () => {
    const [cookies, setCookie] = useCookies(['token']);
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
                if (token != null) {
                    setCookie('token', token);
                    navigate('/');
                }
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
                <InputLabelField
                    label='Username'
                    name='username'
                    type='username'
                    id='username'
                    onChangeInput={onChangeInput}
                    required
                />

                <InputLabelField
                    label='Password'
                    name='password'
                    type='password'
                    id='password'
                    onChangeInput={onChangeInput}
                    required
                />

                {error && <div className='text-red-500 text-sm font-semibold'>{error}</div>}
                <div className='flex flex-col pt-10'>
                    <button
                        onClick={handleSubmit}
                        className='bg-green-500 text-white rounded-md p-2 hover:bg-green-600 text-md font-semibold transition-all'
                    >
                        Login
                    </button>
                </div>
                <div className='flex items-center justify-center mt-8'>
                    Hasn't account?{' '}
                    <Link to={'/register'} className='text-blue-800 font-bold ml-2'>
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
