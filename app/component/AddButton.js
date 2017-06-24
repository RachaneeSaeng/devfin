import React from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

class AddButton extends React.Component{
    
    openAddAnimal() {
        if (this.props.isLoggedIn) {
            this.props.history.push('/addanimal')
        }
        else {            
            this.props.history.push('/login?redirectUrl=addanimal')
        }        
    }

    render() {              
        return (            
            <Button onClick={this.openAddAnimal.bind(this.props.parentPage)}>Add</Button>          
        )
    }
}
const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.authen,
    }
}

export default connect(mapStateToProps)(AddButton)