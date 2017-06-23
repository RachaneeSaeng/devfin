import React from 'react'

const LabeledInput = ({label, type, placeholder, defaultValue}) => (
    <div className='ui labeled input'>
        <div className='ui label'>
            {label}
        </div>
        <input id={label} type={type} placeholder={placeholder} defaultValue={defaultValue}/>
    </div>
)

export {LabeledInput}