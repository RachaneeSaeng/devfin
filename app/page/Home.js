import React from 'react'
import {connect} from 'react-redux'
import FirebaseUtil from '../../script/FirebaseUtil'

class Home extends React.Component{
    
    componentDidMount(){
        
    }
    
    openAddAnimal() {
        if (this.props.isLoggedIn) {
            this.props.history.push('/addanimal')
        }
        else {            
            this.props.history.push('/login?redirectUrl=addanimal')
        }        
    }

    openAnimalList() {
            this.props.history.push('/animalpage')        
    }

    render() {              
        return (            
            <div>
                <h2>Home page</h2>
                <button onClick={this.openAddAnimal.bind(this)}>Add</button>
                {'  '}
                <button onClick={this.openAnimalList.bind(this)}>Adopt</button>
            </div>            
        )
    }
}
const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.authen,
    }
}

export default connect(mapStateToProps)(Home)