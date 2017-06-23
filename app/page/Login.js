import React from 'react'
import * as firebase from 'firebase' 
import * as firebaseui from 'firebaseui' 
import FirebaseUtil from '../../script/FirebaseUtil'

class Login extends React.Component {
    constructor(){
        super()           
    }

    componentDidMount() {   
        var redirectUrl = this.getParameterByName('redirectUrl')   
        var uiConfig = {
            'signInSuccessUrl': '/#/' + redirectUrl,
            'signInFlow': 'redirect',
            'signInOptions': [   
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,          
                firebase.auth.EmailAuthProvider.PROVIDER_ID   
            ]
        };  
        
        if (FirebaseUtil.currentUser) {
            console.log('logged in');
            if (redirectUrl)
                this.props.history.push('/' + redirectUrl)
            else
                this.props.history.push('/')
        }    
        FirebaseUtil.fbUi.start('#firebaseui-container', uiConfig);
    }      

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
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

export default Login