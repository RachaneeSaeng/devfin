import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

import { fbsdkLoaded, gmapLoaded } from '../redux/action/script'

class AppHead extends React.Component{
    constructor(){
        super()
        this.menuLink = ['/','/Dog']
    }

    componentDidMount(){
        loadTrackScript(
            'g-map',
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5fWH_R3S__lzCOPT-RF3N7bgD9kTqLJc',
            () => {
                this.props.dispatch(gmapLoaded())
            }
        )
    }
    
    render(){
        return (
            <div className='following bar'>
                <div className='ui container'>
                    <div className='ui large secondary pointing menu teal'>
                        {this.menuLink.map( page => 
                            <MenuLink
                                key={page}
                                name={page}
                                pathName={this.props.location.pathname}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const MenuLink = ({name, pathName}) => (
    <Link className={`item ${pathName==name?'active':''}`} to={name}> {name.replace('/', '') || 'Home'} </Link>
)

function loadTrackScript(id, url, onload){
    const div = document.createElement('script')
    div.id = id
    div.onload = onload
    div.src = url
    document.body.appendChild(div)
}

export default connect()(AppHead)
