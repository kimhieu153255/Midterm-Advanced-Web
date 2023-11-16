import React from 'react';
import PropTypes from 'prop-types';

const InputLabelField = props => {
    return (
        <div className='flex flex-col gap-2 py-1'>
            <label htmlFor={props.id} className='font-semibold'>
                {props.label}
            </label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                className='border-2 border-gray-400 rounded-md p-2 focus:border-green-500 focus:outline-none focus:ring-green-300 transition-all'
                onChange={props.onChangeInput}
                required={props.required}
            />
        </div>
    );
};

InputLabelField.propTypes = {
    onChangeInput: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    required: PropTypes.bool,
};

export default InputLabelField;
