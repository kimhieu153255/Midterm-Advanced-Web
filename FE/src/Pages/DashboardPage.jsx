import { useContext } from 'react';
import ProductItem from '../components/ProductItem';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className=' flex flex-col items-center w-full'>
            <div className=" flex w-full h-screen bg-[url('src/assets/images/shop.jpg')] bg-no-repeat bg-cover">
                <div className=' w-full h-full bg-black opacity-80'>
                    <div className=' px-4 z-0 h-full flex flex-col justify-center'>
                        <h1 className='text-6xl font-bold text-white'>TOLUS SPRINT COLLECTION</h1>
                        <p className='text-xl font-bold text-white py-12 w-5/6'>
                            Find out our the best spring collection. Offering our best quality
                            production Tolus sprint collection.
                        </p>
                        {(token?.length ?? 0) === 0 && (
                            <button
                                className='bg-white px-8 py-2 border border-solid rounded-2xl w-40 hover:bg-slate-200'
                                onClick={handleClick}
                            >
                                Buy now
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className=' px-12 flex flex-col items-center flex-wrap w-full'>
                <div className='text-3xl font-bold pt-12'>New collection</div>
                <div className='text-lg text-gray-400'>
                    Our latest collection, where classics and contempary style convert to perfect
                    harmany
                </div>
                <div className='flex flex-row flex-wrap justify-start items-center pt-12 py-2'>
                    <ProductItem
                        width={300}
                        description={'Slim fit and Blend Polo T-shirt'}
                        title={'Loro Piana'}
                        height={300}
                        image={'src/assets/images/shirt_1.png'}
                        price={45}
                    />
                    <ProductItem
                        width={300}
                        description={'Slim fit and Blend Polo T-shirt'}
                        title={'Loro Piana'}
                        height={300}
                        image={'src/assets/images/shirt_2.jpg'}
                        price={45}
                    />
                    <ProductItem
                        width={300}
                        description={'Slim fit and Blend Polo T-shirt'}
                        title={'Loro Piana'}
                        height={300}
                        image={'src/assets/images/shirt_3.jpg'}
                        price={45}
                    />
                    <ProductItem
                        width={300}
                        description={'Slim fit and Blend Polo T-shirt'}
                        title={'Loro Piana'}
                        height={300}
                        image={'src/assets/images/shirt_1.png'}
                        price={45}
                    />
                </div>
                <div
                    className={
                        'w-full h-60 bg-[url("src/assets/images/wedding.jpg")] rounded-xl bg-no-repeat bg-cover mt-20 '
                    }
                />
                <div className='text-3xl font-bold pt-12'>WEAR TO WEDDING</div>
                <div className='text-lg text-gray-400'>
                    Our latest collection, where classics and contempary style convert to perfect
                    harmany
                </div>{' '}
                <div className='w-full'>
                    <div className='flex flex-row flex-wrap justify-start items-center pt-12 py-2'>
                        <ProductItem
                            description={'Slim fit and Blend Polo T-shirt'}
                            title={'Loro Piana'}
                            image={'src/assets/images/wed-1.jpg'}
                            price={45}
                        />
                        <ProductItem
                            description={'Slim fit and Blend Polo T-shirt'}
                            title={'Loro Piana'}
                            image={'src/assets/images/wed-2.jpg'}
                            price={45}
                        />
                        <ProductItem
                            description={'Slim fit and Blend Polo T-shirt'}
                            title={'Loro Piana'}
                            image={'src/assets/images/wed-3.jpg'}
                            price={45}
                        />{' '}
                        <ProductItem
                            description={'Slim fit and Blend Polo T-shirt'}
                            title={'Loro Piana'}
                            image={'src/assets/images/wed-3.jpg'}
                            price={45}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
