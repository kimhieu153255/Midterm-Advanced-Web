import React, { useState } from 'react';
import { FaBell, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const arrSidebar = [
    {
        title: 'My account',
        icon: 'user',
        content: [{ title: 'Résumé', path: '/user' }],
    },
    {
        title: 'My order',
        icon: 'cart',
    },
    {
        title: 'Notification',
        icon: 'bell',
    },
];

const SideBarUser = ({ avatar, username }) => {
    const [isDropdown, setIsDropdown] = useState(true);

    const handleDropDown = title => {
        if (title !== 'My account') {
            setIsDropdown(false);
        } else setIsDropdown(true);
    };
    return (
        <div className='flex flex-col w-1/5 bg-gray-100 pl-3 pr-2 py-5 sm:pl-10 gap-3 text-lg min-w-max rounded-md border h-fit'>
            <div className='flex items-center gap-3'>
                <div className='border border-gray-400 ring-gray-100 inline-block rounded-full'>
                    <img
                        src={avatar || 'src/assets/images/avatar.avif'}
                        alt='avatar'
                        className='w-10 h-10 rounded-full inline-block object-cover'
                    />
                </div>
                <div>{username}</div>
            </div>
            {arrSidebar &&
                arrSidebar.map(item => (
                    <div key={item.title}>
                        <div className='flex items-center gap-2 hover:text-green-600'>
                            {item.icon === 'user' && <FaUserAlt></FaUserAlt>}
                            {item.icon === 'cart' && <FaShoppingCart></FaShoppingCart>}
                            {item.icon === 'bell' && <FaBell></FaBell>}
                            <div
                                className='py-2 cursor-pointer '
                                onClick={handleDropDown.bind(this, item.title)}
                            >
                                {item.title}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 min-w-max'>
                            {isDropdown &&
                                item?.content?.map(content => (
                                    <NavLink
                                        key={content.title}
                                        to={content.path}
                                        className={({ isActive }) =>
                                            (isActive ? 'text-green-500 ' : '') +
                                            'hover:text-green-400 pl-6 min-w-max'
                                        }
                                    >
                                        {content.title}
                                    </NavLink>
                                ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SideBarUser;
