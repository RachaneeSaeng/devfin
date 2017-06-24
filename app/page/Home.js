import React from 'react'
import AddButton from '../component/AddButton'
import {Button} from 'semantic-ui-react'
//import FirebaseUtil from '../../script/FirebaseUtil'

class Home extends React.Component{
    
    render() {              
        return (            
            <div>
                <h2>Home page</h2>
                <AddButton parentPage={this}/>
                {'  '}
                <Button onClick={() => this.props.history.push('/animalpage')}>Adopt</Button>
            </div>            
        )
    }
}

export default Home