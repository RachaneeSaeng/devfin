import React from 'react'
import * as firebase from 'firebase'
import {Button, Confirm} from 'semantic-ui-react'
import {connect} from 'react-redux'

class AdoptButton extends React.Component{
   
    state = { openAdopt: false}

    componentDidMount(){
        this.parent = this.props.parentPage;
    }

    adoptAnimal() {
        if (!this.props.isLoggedIn) {
            var animalId = this.parent.props.match.id;
            this.parent.props.history.push(`/login?redirectUrl=animaldetail/${animalId}`)
        }        
        //Confirm      
        this.setState({ openAdopt: true })        
    }

    confirmAdopt() {
        this.setState({openAdopt: false })
        // Save data to database
        const newNotiKey = firebase.database().ref().child('notification').push().key;
        const requestor = firebase.auth().currentUser
        //const ownerId = this.parent.props.ownerId
        const ownerId = firebase.auth().currentUser.uid
        // var requesterNoti = {
        //     animalId: this.parent.props.animalId,
        //     actorName: this.parent.props.ownerDisplayName,
        //     actorEmail: this.parent.props.ownerEmail,
        //     actorPhotoUrl: his.parent.props.ownerPhotoURL,            
        //     notiType: 'Pending',
        //     timestamp: firebase.database.ServerValue.TIMESTAMP,
        // }; 
        var ownerNoti = {
            animalId: this.parent.props.animalId,
            actorName: requestor.displayName,
            actorEmail: requestor.email,
            actorPhotoUrl: requestor.photoURL,            
            notiType: 'Request',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };    
         // Get a key for a new Post.    
        var updates = {};         
        //updates[`/notification/${requestor.uid}/${newNotiKey}`] = requesterNoti;  
        updates[`/notification/${ownerId}/${newNotiKey}`] = ownerNoti;      
        firebase.database().ref().update(updates);
    }

    cancelAdopt() {
        this.setState({openAdopt: false })        
    }

    render() {              
        return (  
            <div>
                <Button primary className='float-right' onClick={this.adoptAnimal.bind(this)}>Adopt</Button>
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