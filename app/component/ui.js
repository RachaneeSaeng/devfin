import React from 'react'

const LabeledInput = ({label, type, disabled, placeholder, defaultValue}) => (
    <div className='ui labeled input'>
        <div className='ui label'>
            {label}
        </div>
        <input id={label} type={type} disabled={disabled} placeholder={placeholder} defaultValue={defaultValue}/>
    </div>
)

const Button = ({className, hidden, children}) => (
    <div className={`ui button ${className}`} style={{display:hidden?'none':''}}>
        {children}
    </div>
)

export {LabeledInput, Button}