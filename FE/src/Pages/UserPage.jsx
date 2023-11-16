import { useState } from 'react';
import InputLabelField from '../components/InputField';

const User = () => {
    const [error, setError] = useState('');
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const onChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = async e => {};

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='sm:w-2/6 w-3/5 mx-auto bg-gray-100 shadow-md sm:p-16 p-10 border rounded-md'>
                <h1 className='text-center font-bold text-3xl mb-5'>Edit profile</h1>
                <InputLabelField
                    label='Full name'
                    name='name'
                    type='text'
                    id='name'
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
                    label='Phone'
                    name='phone'
                    type='text'
                    id='phone'
                    onChangeInput={onChangeInput}
                    required
                />

                {error && <div className='text-red-500 text-sm font-semibold'>{error}</div>}
                <div className='flex flex-col pt-10'>
                    <button
                        onClick={handleSave}
                        className='bg-green-500 text-white rounded-md p-2 hover:bg-green-600 text-md font-semibold transition-all'
                    >
                        Save profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;
