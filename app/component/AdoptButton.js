import React from 'react'
import {Button, Confirm} from 'semantic-ui-react'
import {connect} from 'react-redux'

class AdoptButton extends React.Component{

    state = { openAdopt: false}

    adoptAnimal() {
        if (!this.props.isLoggedIn) {
            this.props.parentPage.props.history.push('/login?redirectUrl=animaldetail/-KnOeLmXcJVxmc6-ehCR')
        }        
        //Confirm      
        this.setState({ openAdopt: true })        
    }
    confirmAdopt() {
        this.setState({openAdopt: false })
        // Save data to database
        console.log('yssss')
    }
    cancelAdopt() {
        this.setState({openAdopt: false })
        // Save data to database
        console.log('noo')
    }

    render() {              
        return (  
            <div>
                <Button className='float-right' onClick={this.adoptAnimal.bind(this)}>Adopt</Button>
                 <Confirm
                    content='คุณต้องการรับสัตว์ตัวนี้ไปเลี้ยงใช่ไหม? หากคุณกดตกลง เราจะส่งคำขอของคุณไปยังผู้โพส.'
                    confirmButton='ตกลง' cancelButton='ยกเลิก' 
                    open={this.state.openAdopt}
                    onCancel={this.cancelAdopt.bind(this)}
                    onConfirm={this.confirmAdopt.bind(this)}
                    />
            </div>  
        )
    }
}
const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.authen,
    }
}

export default connect(mapStateToProps)(AdoptButton)