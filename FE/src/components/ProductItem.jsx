import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = props => {
    return (
        <div className='flex flex-col justify-between px-2 py-2 w-1/4'>
            <div className='h-80'>
                <img
                    src={props.image}
                    className='rounded-lg w-full h-80'
                    alt='product'
                />
            </div>
            <h2 className='text-xl font-bold pt-4'>{props.title}</h2>
            <p className='text-md font-bold text-gray-500'>{props.description}</p>{' '}
            <h2 className='text-xl font-bold pt-4'>${props.price}</h2>
        </div>
    );
};

ProductItem.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
};
export default ProductItem;
