import React from 'react'
import {Link} from 'react-router-dom'

export const LabeledInput = ({label, type, disabled, placeholder, defaultValue, value}) => (
    <div className='ui labeled input'>
        <div className='ui label'>
            {label}
        </div>
        <input id={label} type={type} disabled={disabled} placeholder={placeholder} defaultValue={defaultValue} value={value}/>
    </div>
)

export const Button = ({className, hidden, onClick, children}) => (
    <button className={`ui button ${className}`} style={{display:hidden?'none':''}} onClick={onClick}>
        {children}
    </button>
)

export const AnimalMarker = ({img}) => (
    <img src={img} style={{borderRadius: '50%', border: 'green solid', width:48, height: 48}} />
)

export const AnimalMarkerWithLink = ({img, onClick}) => (
    <img
        src={img}
        style={{borderRadius: '50%', border: 'green solid', width:48, height: 48, cursor:'pointer'}}
        onClick={onClick}
    />
)