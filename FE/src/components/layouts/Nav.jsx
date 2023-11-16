import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

const NavList = [
    {
        path: '/',
        name: 'Home',
    },
];

const navLogin = [
    {
        path: '/login',
        name: 'Login',
    },
    {
        path: '/register',
        name: 'Register',
    },
];

const navLogout = [
    {
        path: '/user',
        name: 'User',
    },
];

const Nav = () => {
    const [cookies, removeCookie] = useCookies(['token']);
    const isLogin = useRef();

    const [user, setUser] = useState();
    const [navList, setNavList] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if ((cookies.token?.length ?? 0) > 0) {
            setNavList(navLogout);
            isLogin.current = true;
        } else {
            setNavList(navLogin);
            isLogin.current = false;
        }
    }, [cookies.token]);

    const handleLogout = async () => {
        removeCookie('token', null, { path: '/' });
    };

    return (
        <div className='shadow-md mb-2 px-[10%] bg-gray-100 min-w-max'>
            {/* nav top */}
            <div className='p-1 pt-2 flex items-center justify-between gap-x-12 sm:gap-x-16 w-auto text-lg font-semibold min-w-max z-30 inset-1'>
                <>
                    <NavLink
                        to={'/'}
                        className={({ isActive }) =>
                            (isActive == -1 ? 'text-green-500 ' : '') + 'hover:text-green-400'
                        }
                    >
                        {'Home'}
                    </NavLink>
                </>
                <div>
                    {navList &&
                        navList?.map((item, index) => {
                            if (item.name === 'User')
                                return (
                                    <div
                                        key={index}
                                        className={'z-20'}
                                        onMouseOver={() => setIsDropdown(true)}
                                        onMouseLeave={() => setIsDropdown(false)}
                                    >
                                        <div
                                            className='hover:text-green-400 cursor-pointer ml-4'
                                            onClick={() => navigate('/user')}
                                        >
                                            <div className='flex items-center gap-x-2'>
                                                {user?.username || 'User'}
                                            </div>
                                        </div>
                                        {isDropdown && (
                                            <div className='absolute bg-gray-200 shadow-md rounded-md py-2 px-8 flex flex-col gap-2'>
                                                <button
                                                    className='hover:text-green-400 cursor-pointer border-b pb-1'
                                                    onClick={() => navigate('/user')}
                                                >
                                                    Profile
                                                </button>
                                                <div
                                                    onClick={handleLogout}
                                                    className='hover:text-green-400 cursor-pointer'
                                                >
                                                    Logout
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            return (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        (isActive ? 'text-green-500 ' : '') +
                                        'hover:text-green-400 ml-4'
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Nav;
