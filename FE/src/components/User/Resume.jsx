import { useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axiosSingleton from '../../services/AxiosInstance';
// import { FaX } from 'react-icons/fa6';

const Resume = ({ user }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     try {
    //         const res = await axiosSingleton.put('me', data, {
    //             headers: {
    //                 Authorization: `Bearer ${cookies.token}`,
    //             },
    //         });
    //         if (res.status === 200) {
    //             window.location.reload();
    //         } else setError(res?.response?.data?.message);
    //     } catch (error) {
    //         console.log(error);
    //         setError(error);
    //     }
    // };

    return (
        <div className='flex flex-col w-full min-w-max p-14 shadow-md bg-gray-50 border rounded-lg h-full'>
            <div className='border-b-2 border-gray-300 ml-3'>
                <h2 className=' font-bold text-2xl'>Résumé</h2>
                <div className='text-lg'>Manager your résumé to protect your account</div>
            </div>
            {user && (
                <form className='m-5 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div className='flex flex-col gap-3 min-w-max w-full mr-5'>
                            <div className='p-1.5'>
                                <div className='font-semibold w-40 sm:w-20 mr-5 inline-block text-right'>
                                    Username:
                                </div>
                                <span>{user?.username || 'username'}</span>
                            </div>
                            <div className='p-1.5 flex'>
                                <span className='font-semibold w-40 sm:w-20 mr-5 inline-block text-right'>
                                    Name:
                                </span>
                                <input
                                    type='text'
                                    name='fullName'
                                    className='border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent p-1.5 w-full'
                                    defaultValue={user?.fullName || ''}
                                    onChange={e => {
                                        setData({ ...data, fullName: e.target.value });
                                    }}
                                ></input>
                            </div>
                            <div className='p-1.5 flex'>
                                <span className='font-semibold w-40 sm:w-20 mr-5 inline-block text-right'>
                                    Email:
                                </span>
                                <input
                                    type='text'
                                    name='email'
                                    className='border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent p-1.5 w-full'
                                    defaultValue={user?.email || ''}
                                    onChange={e => {
                                        setData({ ...data, email: e.target.value });
                                    }}
                                ></input>
                            </div>
                            <div className='p-1.5 w-full flex'>
                                <span className='font-semibold w-40 sm:w-20 mr-5 inline-block text-right'>
                                    phone:
                                </span>
                                <input
                                    type='text'
                                    name='phone'
                                    className='border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent p-1.5 w-full'
                                    defaultValue={user?.phone || ''}
                                    onChange={e => {
                                        setData({ ...data, phone: e.target.value });
                                    }}
                                ></input>
                            </div>
                        </div>
                        <div className='w-2/5 min-w-max flex flex-col justify-center items-center gap-2 border-l-2 border-gray-300 px-5'>
                            <div className='w-32 h-32 rounded-full'>
                                <img
                                    src={user?.avatar || 'src/assets/images/avatar.avif'}
                                    alt='avatar'
                                    className='w-32 h-32 rounded-full object-cover  '
                                ></img>
                            </div>
                            {/* sửa fileInput1 thành fileInput nếu thực hiện chức năng đổi ảnh  */}
                            <div>
                                <input
                                    type='file'
                                    accept='image/jpeg, image/png, image/jpg'
                                    className='hidden'
                                    id='fileInput'
                                />
                                <label
                                    htmlFor='fileInput1'
                                    className='border border-green-200 bg-green-500 p-1.5 rounded-md hover:bg-green-600 text-white cursor-pointer inline-block text-center '
                                >
                                    Change
                                </label>
                            </div>
                            <div>
                                Maximum file size 1 MB <br /> Format: .JPEG, .PNG
                            </div>
                        </div>
                    </div>
                    {error && (
                        <div className='text-red-500 text-sm font-semiboldm mt-4'>{error}</div>
                    )}
                    <button
                        type='submit'
                        className='border border-green-200 p-1.5 px-5 mx-auto rounded-md bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-white font-semibold '
                    >
                        Save
                    </button>
                </form>
            )}
        </div>
    );
};

export default Resume;
