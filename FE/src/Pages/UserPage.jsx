import { useEffect, useRef, useState } from 'react';
import SideBarUser from '../components/User/SideBarUser';
import Resume from '../components/User/Resume';
import axiosSingleton from '../services/AxiosInstance';
import { useCookies } from 'react-cookie';
import Layout from '../components/layouts/Layout';
import { FaX } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const onChangeInput = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getUser = async () => {
        console.log('token: ', cookies.token);
        try {
            const res = await axiosSingleton.get('me', {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            if (res.status === 200) setUser(res.data.metadata.user);
            else {
                setCookie('token', null);
                navigate('/');
            }
        } catch (err) {
            setCookie('token', null);
            navigate('/');
        }
    };

    useEffect(() => {
        if (cookies.token == null) navigate('/');
        getUser();
    }, []);

    return (
        <Layout>
            <div className='flex justify-between gap-5 w-full mt-10'>
                <SideBarUser avatar={user?.avatar} username={user?.username}></SideBarUser>
                <Resume user={user}></Resume>
            </div>
        </Layout>
    );
};

export default User;
