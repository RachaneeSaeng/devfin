import React from 'react'
import * as firebase from 'firebase'
import {Button, Confirm} from 'semantic-ui-react'
import {connect} from 'react-redux'

class AdoptButton extends React.Component{
   
    state = { show: true, openAdopt: false}

    componentDidMount(){
        this.parent = this.props.parentPage;
        this.checkShow();
    }

    componentWillUpdate(prevProps) {
        if(prevProps != this.props)
            this.checkShow();
    }

    checkShow() {
        if (this.props.isLoggedIn) {
            if ((this.props.owner && this.props.owner.id == firebase.auth().currentUser.uid)
             || this.props.status == 'Adopted' || this.props.status == 'Deleted') {
                this.setState({show: false})
             }
        }
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
        const owner = this.props.owner

        var requesterNoti = {
            animalId: this.props.animalId,
            actorId: owner.id,
            actorName: owner.displayName,
            actorEmail: owner.email,
            actorPhotoUrl: owner.photo,            
            notiType: 'Pending',
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        }; 
        var ownerNoti = {
            animalId: this.parent.props.animalId,
            actorId: requestor.uid,
            actorName: requestor.displayName,            
            actorEmail: requestor.email,
            actorPhotoUrl: requestor.photoURL,            
            notiType: 'Request',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };    
         // Get a key for a new Post.    
        var updates = {};         
        updates[`/notification/${requestor.uid}/${newNotiKey}`] = requesterNoti;  
        updates[`/notification/${owner.id}/${newNotiKey}`] = ownerNoti;      
        firebase.database().ref().update(updates);
    }
    
    cancelAdopt() {
        this.setState({openAdopt: false })
    }

    render() {  
        return (  
            <div className={this.state.show ? '':'hidden'}>
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
        animalId: store.currentAnimal.animalId,
        owner: store.currentAnimal.owner,
        status: store.currentAnimal.status,
    }
}

export default connect(mapStateToProps)(AdoptButton)