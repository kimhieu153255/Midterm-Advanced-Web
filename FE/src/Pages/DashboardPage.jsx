import ProductItem from '../components/Product/ProductItem';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Layout from '../components/layouts/Layout';

const FakeData = [
    {
        id: 1,
        title: 'Loro Piana',
        description: 'Slim fit and Blend Polo T-shirt',
        image: '/images/shirt_1.png',
        price: 45,
    },
    {
        id: 2,
        title: 'Loro Piana',
        description: 'Slim fit and Blend Polo T-shirt',
        image: '/images/shirt_2.jpg',
        price: 45,
    },
    {
        id: 3,
        title: 'Loro Piana',
        description: 'Slim fit and Blend Polo T-shirt',
        image: '/images/shirt_3.jpg',
        price: 45,
    },
    {
        id: 4,
        title: 'Loro Piana',
        description: 'Slim fit and Blend Polo T-shirt',
        image: '/images/shirt_1.png',
        price: 45,
    },
];

const DashboardPage = () => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <Layout>
            <div className='flex flex-col items-center'>
                {!cookies.token && (
                    <div className={`flex w-full h-[550px] relative min-w-fit`}>
                        <div className='absolute border rounded-2xl w-full h-full object-cover z-0 opacity-50 '>
                            <img
                                src='/images/shop.jpg'
                                alt='logo'
                                className='w-full h-full rounded-3xl '
                            />
                        </div>
                        <div className='w-full h-full bg-black opacity-80 rounded-2xl'>
                            <div className=' z-0 h-full flex flex-col justify-end mx-10 gap-6'>
                                <h1 className='text-6xl font-bold text-white'>
                                    TOLUS SPRINT COLLECTION
                                </h1>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-bold text-gray-300 my-12 line-clamp-2 overflow-hidden'>
                                        Find out our the best spring collection. Offering our best
                                        quality production Tolus spring collection.
                                    </p>
                                    <button
                                        className='bg-white px-8 py-2 border border-solid rounded-2xl w-40 hover:bg-slate-200 font-bold min-w-max'
                                        onClick={handleClick}
                                    >
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='flex flex-col items-center flex-wrap w-full mt-12 gap-12'>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <div className='text-3xl font-bold'>New collection</div>
                        <div className='text-lg text-gray-400 line-clamp-2'>
                            Our latest collection, where classics and contempary style convert to
                            perfect harmany
                        </div>
                    </div>
                    <div className='flex w-full flex-wrap justify-start items-center py-2'>
                        {FakeData.map((item, index) => (
                            <ProductItem
                                key={index}
                                description={item.description}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                            />
                        ))}
                    </div>
                    <div
                        className={
                            'w-full h-96 relative bg-cover bg-center rounded-2xl overflow-hidden'
                        }
                    >
                        <img
                            src='https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop'
                            alt='wedding'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-3'>
                        <div className='text-3xl font-bold line-clamp-1'>WEAR TO WEDDING</div>
                        <div className='text-lg text-gray-400 line-clamp-2'>
                            Our latest collection, where classics and contempary style convert to
                            perfect harmany
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-row flex-wrap justify-start items-center py-2 min-w-fit'>
                            {FakeData.map((item, index) => (
                                <ProductItem
                                    key={index}
                                    description={item.description}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
