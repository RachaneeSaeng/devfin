import React from 'react'
import {Button, Segment, Divider, Header} from 'semantic-ui-react'
import NotiCard from '../component/NotiCard'
import {connect} from 'react-redux'
import * as firebase from 'firebase'
import FirebaseUtil from '../../script/FirebaseUtil'

class Notification extends React.Component {
    state = {notifications: []}

    componentDidUpdate(prevProps) {        
        if (prevProps != this.props && this.props.isLoggedIn) {
            var thisObj = this  
            var my =firebase.auth().currentUser.uid
            firebase.database().ref(`notification/${firebase.auth().currentUser.uid}`).once('value', snap => {                
                var notiObj = snap.val();

                if (notiObj) {
                    const notiIds = Object.keys(notiObj);            
                    notiIds.forEach((item) => {
                        FirebaseUtil.getAnimalDetail(notiObj[item].animalId).then(result => {
                            this.state.notifications.push({
                                id: item,            
                                animalName: result.animalName,
                                animalPhotoUrl: result.photo_urls[0],
                                animalLocation: 'N/A',
                                animalDesc: result.description,
                                actorName: notiObj[item].actorName,
                                actorEmail: notiObj[item].actorEmail,
                                actorPhotoUrl: notiObj[item].actorPhotoUrl,
                                timestamp: notiObj[item].timestamp,
                                notiType: notiObj[item].notiType
                            }) 
                            thisObj.setState({notifications: this.state.notifications});                          
                        })
                    });
                }
            });
        }  
    }

    render() {          
        if(this.state.notifications.length == 0){
            return (<i className='notched circle loading icon'></i>)
        }
        return (    
            <div>   
                {this.state.notifications.filter(noti => noti.notiType == 'Request').map(noti =>
                    <Segment key={noti.id} >
                        <Header as='h3' textAlign='center'>Adoption request</Header>
                        <NotiCard carddata={noti}/>
                        <div className='text-center comfort-mergin'>
                            <Button primary>Approve</Button>{'   '}
                            <Button secondary>Reject</Button>
                        </div>
                    </Segment>
                )}   
                <Divider section></Divider>
                {this.state.notifications.filter(noti => noti.notiType != 'Request').map(noti =>                    
                    <Segment key={noti.id} >
                        <Header as='h3' textAlign='center' color={noti.notiType == 'Approved' ? 'green': 'red'}>{noti.notiType} request</Header>
                        <NotiCard carddata={noti}/>
                        <div className='text-center comfort-mergin'>
                            <Button primary>OK</Button>                            
                        </div>
                    </Segment>
                )} 
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