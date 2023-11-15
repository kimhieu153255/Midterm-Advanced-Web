import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validatePhone } from '../helpers/helper.js';
import { useCookies } from 'react-cookie';
import axiosSingleton from '../services/AxiosInstance.jsx';

const Register = () => {
    const [cookies, setCookies] = useCookies(['token']);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
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
        if (validate() === false) return;

        try {
            const res = await axiosSingleton.post('signup', data);
            console.log(res);
            if (res.status === 201) {
                const resLogin = await axiosSingleton.post('login', {
                    username: data.username,
                    password: data.password,
                });
                const token = resLogin?.data?.metadata?.token;
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

    // Validate input fields
    const validate = () => {
        if (
            data.confirmPassword === '' ||
            data.password === '' ||
            data.email === '' ||
            data.phone === '' ||
            data.username === ''
        ) {
            setError('Please fill in all fields before submitting');
            return false;
        }
        if (data.password !== data.confirmPassword) {
            setError('Password and confirm password must be the same');
            return false;
        }
        if (!validatePassword(data.password)) {
            setError(
                'Password must be 6-20 characters, contain at least one uppercase letter, one lowercase letter and one number',
            );
            return false;
        }
        if (!validateEmail(data.email)) {
            setError('Invalid email');
            return false;
        }
        if (!validatePhone(data.phone)) {
            setError('Invalid phone number');
            return false;
        }
        return true;
    };

    return (
        <div className='flex justify-center items-center my-3 flex-wrap'>
            <div className='sm:w-2/6 w-3/5 mx-auto bg-gray-100 shadow-md sm:p-16 p-10 border rounded-md'>
                <div className='flex flex-col gap-1.5 mx-auto'>
                    <h1 className='text-center font-bold text-3xl mb-5'>Register</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='username' className='font-semibold'>
                            Username
                        </label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                            required
                            value={data.username}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <label htmlFor='email' className='font-semibold'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={data.email}
                            className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                            required
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <label htmlFor='password' className='font-semibold'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={data.password}
                            className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                            required
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <label htmlFor='confirmPassword' className='font-semibold'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            value={data.confirmPassword}
                            className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                            required
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <label htmlFor='phone' className='font-semibold'>
                            Phone
                        </label>
                        <input
                            type='text'
                            name='phone'
                            id='phone'
                            value={data.phone}
                            className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                            required
                            onChange={onChangeInput}
                        />
                    </div>
                    {error && (
                        <div className='text-red-500 text-sm font-semiboldm mt-4'>{error}</div>
                    )}

                    <button
                        className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 text-md font-semibold transition-all mt-4'
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
