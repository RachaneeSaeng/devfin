import React from 'react'
import * as firebase from 'firebase' 
import * as firebaseui from 'firebaseui' 
import {connect} from 'react-redux'
import FirebaseUtil from '../../script/FirebaseUtil'

class Login extends React.Component {
    constructor(){
        super()           
    }

    componentDidMount() {   
        var redirectUrl = this.getParameterByName('redirectUrl')   
        redirectUrl = (redirectUrl ? redirectUrl : '')

        var uiConfig = {
            'signInSuccessUrl': '/#/' + redirectUrl,
            'signInFlow': 'redirect',
            'signInOptions': [   
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,          
                firebase.auth.EmailAuthProvider.PROVIDER_ID   
            ]
        }  
        
        if (this.props.isLoggedIn) {            
            this.props.history.push('/' + redirectUrl)
        }    
        FirebaseUtil.fbUi.start('#firebaseui-container', uiConfig)
    }      

    getParameterByName(name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, " "))
    }

    render(){      
        return (
            <div className='ui container'>               
                <div id="loaded" className="hidden">
                    <div id="main">
                        <div id="firebaseui-container"></div>                                                
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.authen,
    }
}

export default connect(mapStateToProps)(Login)