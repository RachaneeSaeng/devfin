import React from 'react'
import {Button, Segment, Divider, Header, Confirm} from 'semantic-ui-react'
import NotiCard from '../component/NotiCard'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import FirebaseUtil from '../../script/FirebaseUtil'

class Notification extends React.Component {
    state = {loading: true, notifications: [], openApprove: false, notiIndex: ''}

    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.queryNotification()
        }
    }

    componentDidUpdate(prevProps) {        
        if (prevProps != this.props && this.props.isLoggedIn) {
            this.queryNotification()
        }  
    }

    queryNotification() {
        var thisObj = this  
        var my =firebase.auth().currentUser.uid
        if (this.state.notifications.length == 0) {
            firebase.database().ref(`notification/${firebase.auth().currentUser.uid}`).once('value').then(snap => {                
                var notiObj = snap.val();

                if (notiObj) {
                    const notiIds = Object.keys(notiObj);            
                    notiIds.forEach((item) => {
                        FirebaseUtil.getAnimalDetail(notiObj[item].animalId).then(result => {
                            this.state.notifications.push({
                                id: item,   
                                animalId: notiObj[item].animalId,       
                                animalName: result.animalName,
                                animalPhotoUrl: result.photo_urls[0],
                                animalLocation: result.location,
                                animalDesc: result.description,
                                actorId: notiObj[item].actorId,
                                actorName: notiObj[item].actorName,
                                actorEmail: notiObj[item].actorEmail,
                                actorPhotoUrl: notiObj[item].actorPhotoUrl,
                                timestamp: notiObj[item].timestamp,
                                notiType: notiObj[item].notiType
                            }) 
                            if (this.state.notifications.length == notiIds.length) {
                                this.setState({loading: false})
                                thisObj.setState({notifications: this.state.notifications}); 
                            }                         
                        })
                    });
                } 
                this.setState({loading: false})           
            });
        }
    }

    approveHandler(notiIndex) {
        // confirm approve        
        this.setState({openApprove: true, notiIndex: notiIndex})   
    }
    confirmApprove() {
        this.setState({openApprove: false})     
        var noti = this.state.notifications[this.state.notiIndex];        
        var updates = {} 

        // changeOwner to requestor 
        var newOwner = {
            id: noti.actorId,
            displayName: noti.actorName,
            email: noti.actorEmail,
            photo: noti.actorPhotoUrl,   
            contact: noti.actorEmail 
        };
        updates[`/animals/${noti.animalId}/owner`] = newOwner;

        // Update pending of requestor to be approved        
        updates[`/notification/${noti.actorId}/${noti.id}/notiType`] = 'Approved';

        // remove noti from owner
        updates[`/notification/${firebase.auth().currentUser.uid}/${noti.id}`] = null;

        firebase.database().ref().update(updates);

        //update state
        this.state.notifications.remove(this.state.notiIndex);
        thisObj.setState({notifications: this.state.notifications});
    }
    cancelApprove() {
        this.setState({openApprove: false})        
    }

    rejectHandler(notiIndex) {
        var noti = this.state.notifications[notiIndex];        
        var updates = {} 
        // Update pending of requetor to be rejected
        updates[`/notification/${noti.actorId}/${noti.id}/notiType`] = 'Rejected';
        // remove noti from owner
        updates[`/notification/${firebase.auth().currentUser.uid}/${noti.id}`] = null;

        firebase.database().ref().update(updates);
        //update state
        this.state.notifications.remove(this.state.notiIndex);
        thisObj.setState({notifications: this.state.notifications});
    }

    okHandler(notiIndex) {
        var noti = this.state.notifications[notiIndex]; 
        var updates = {}; 
        // clear notification
        updates[`/notification/${firebase.auth().currentUser.uid}/${noti.id}`] = null;
        firebase.database().ref().update(updates);
        //update state
        this.state.notifications.remove(this.state.notiIndex);
        thisObj.setState({notifications: this.state.notifications});
    }

    render() { 
        if(this.state.loading){
            return (<i className='notched circle loading icon'></i>)
        }
        if(this.state.notifications.length == 0){
            return (<h3>no data found</h3>)
        }
        return (    
            <div>   
                <Divider horizontal>Your Animal Request</Divider>
                {this.state.notifications.filter(noti => noti.notiType == 'Request').map((noti, index) =>
                    <Segment key={index} >
                        <Header as='h3' textAlign='center'>Animal Request</Header>
                        <NotiCard carddata={noti}/>
                        <div className='text-center comfort-mergin'>
                            <Button primary onClick={() => this.approveHandler(index)}>Approve</Button>{'   '}
                            <Button secondary onClick={() => this.rejectHandler(index)}>Reject</Button>
                        </div>
                    </Segment>
                )}   
                <br/>
                <Divider horizontal>Your Adoption Request</Divider>
                {this.state.notifications.filter(noti => noti.notiType != 'Request').map((noti, index) =>                    
                    <Segment key={index} >
                        <Header as='h3' textAlign='center' color={noti.notiType == 'Pending' ? 'yellow' : noti.notiType == 'Approved' ? 'green': 'red'}>{noti.notiType}</Header>
                        <NotiCard carddata={noti}/>
                        {noti.notiType == 'Pending' ? null :
                            <div className='text-center comfort-mergin'>
                                <Button primary onClick={() => this.okHandler(index)}>OK</Button>                            
                            </div>
                        }                        
                    </Segment>
                )} 
                <Confirm
                    content="คุณต้องการอนุญาตให้คนนี้รับสัตว์ไปเลี้ยงใช่หรือไม่? หากคุณกดตกลง เราจะเปลี่ยนเจ้าของและเปลี่ยนสถานะของสัตว์ตัวนี้เป็น 'มีบ้านแล้ว'"
                    confirmButton='ตกลง' cancelButton='ยกเลิก' 
                    open={this.state.openApprove}
                    onCancel={this.cancelApprove.bind(this)}
                    onConfirm={this.confirmApprove.bind(this)}
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

export default connect(mapStateToProps)(Notification)