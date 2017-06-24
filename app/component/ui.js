import React from 'react'

const LabeledInput = ({label, type, disabled, placeholder, defaultValue, value}) => (
    <div className='ui labeled input'>
        <div className='ui label'>
            {label}
        </div>
        <input id={label} type={type} disabled={disabled} placeholder={placeholder} defaultValue={defaultValue} value={value}/>
    </div>
)

const Button = ({className, hidden, onClick, children}) => (
    <button className={`ui button ${className}`} style={{display:hidden?'none':''}} onClick={onClick}>
        {children}
    </button>
)

export {LabeledInput, Button}