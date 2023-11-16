import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validatePhone } from '../helpers/helper.js';
import { useCookies } from 'react-cookie';
import axiosSingleton from '../services/AxiosInstance.jsx';
import InputLabelField from '../components/Fields/InputField';

const Register = () => {
    const [cookies, setCookie] = useCookies(['token']);
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

                    <InputLabelField
                        label='Username'
                        name='username'
                        type='username'
                        id='username'
                        onChangeInput={onChangeInput}
                        required
                    />

                    <InputLabelField
                        label='Email'
                        name='email'
                        type='email'
                        id='email'
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

                    <InputLabelField
                        label='Confirm Password'
                        name='confirmPassword'
                        type='password'
                        id='confirmPassword'
                        onChangeInput={onChangeInput}
                        required
                    />

                    <InputLabelField
                        label='Phone'
                        name='phone'
                        type='text'
                        id='phone'
                        onChangeInput={onChangeInput}
                        required
                    />

                    {error && (
                        <div className='text-red-500 text-sm font-semiboldm mt-4'>{error}</div>
                    )}

                    <button
                        className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 text-md font-semibold transition-all mt-4'
                        onClick={handleSubmit}
                    >
                        Register
                    </button>
                    <div className='flex items-center justify-center mt-8'>
                        Already have an account?{' '}
                        <Link to={'/login'} className='text-blue-800 font-bold ml-2'>
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
