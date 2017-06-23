import React from 'react'
import FirebaseUtil from '../../script/FirebaseUtil'

class Home extends React.Component{
    
    componentDidMount(){
        
    }
    
    openAddAnimal() {
        if (FirebaseUtil.currentUser) {
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
                <button onClick={this.openAnimalList.bind(this)}>Adopt</button>
                <button onClick={FirebaseUtil.signOut}>Logout</button>
            </div>            
        )
    }
}

export default Home