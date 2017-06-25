import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import * as firebase from 'firebase'
import * as actionCreator from '../redux/action/currentAnimal'
import GoogleMapReact  from 'google-map-react'

import {LabeledInput, Button, AnimalMarker} from '../component/ui'
import Camera from '../component/Camera'
import ImagePicker from '../component/ImagePicker'

class AnimalDetail extends React.Component {
    database = firebase.database()
    storage = firebase.storage()
    auth = firebase.auth()
    files = []
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.dispatch(actionCreator.beginFetch())
            this.database.ref(`animals/${this.props.match.params.id}`).once('value')
                .then( animal => {
                    const val = animal.val()
                    val.animalId = this.props.match.params.id
                    if(val){
                        this.props.dispatch(actionCreator.endFetch(val))
                        const update = {}
                        update[`animals/${this.props.match.params.id}/view`] = val.view+1
                        this.database.ref().update(update)
                    }else
                        this.props.dispatch(actionCreator.createNew())
                })
                .catch( e =>{
                    console.log(e)
                    this.props.dispatch(actionCreator.error('not found'))
                })
        }else{
            this.props.dispatch(actionCreator.createNew())
            console.log('eiei')
            navigator.geolocation.getCurrentPosition( pos => {
                console.log(pos)
                this.props.dispatch(actionCreator.updateLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }))
            })
        }
    }

    render (){
        if(this.props.isLoading){
            return (<i className='notched circle loading icon'></i>)
        }
        if(this.props.error){
            return (
                <div className='ui container'>
                    <h1 style={{color:'red'}}> {this.props.error} </h1>
                    <Button className='primary' onClick={()=>{this.props.history.push('/addanimal')}}> Add new one </Button>
                </div>
            )
        }
        return(
            <div className='ui container'>
                <h1> {this.props.animalName} </h1>
                <div className="ui labeled button" tabIndex="0">
                    <div className="ui icon button">
                        <i className="eye icon"></i>
                    </div>
                    <span className="ui basic label">
                        {this.props.view}
                    </span>
                </div>
                <div id='detail-images'>
                    { this.props.photoUrls.map( url => (<img key={url} src={url} alt='dog-image' />)) }
                </div>
                {this.props.edit && !this.props.capture && <ImagePicker />}
                <Button hidden={!this.props.edit} onClick={()=>{!this.props.capture?this.props.dispatch(actionCreator.beginCapture()):this.props.dispatch(actionCreator.endCapture())}}>
                    <i className='ui icon camera'></i>
                </Button>
                {this.props.capture?<Camera />:null}
                <div id='detail-body'>
                    <LabeledInput label='name' type='text' disabled={!this.props.edit} placeholder='เจ้าด่าง' defaultValue={this.props.animalName} />
                    <LabeledInput label='type' type='text' disabled={!this.props.edit} placeholder='หมา' defaultValue={this.props.animalType} />
                    <LabeledInput label='breed' type='text' disabled={!this.props.edit} placeholder='ไซบีเรียน ฮัสกี้' defaultValue={this.props.breed}/>
                    <LabeledInput label='gender' type='text' disabled={!this.props.edit} placeholder='ผู้' defaultValue={this.props.gender}/>
                    <LabeledInput label='location' type='text' disabled={!this.props.edit} placeholder='มาบุญครอง' defaultValue={this.props.foundLocation}/>
                    <div className='ui labeled input'>
                        <div className='ui label'>
                            <i className='icon pin'></i>
                        </div>
                        <input id='lat' type='number' disabled value={this.props.geo.lat}/>
                        <input id='lng' type='number' disabled value={this.props.geo.lng}/>
                    </div>
                    <LabeledInput label='contact' type='text' disabled={true} value={this.props.contact}/>
                    <LabeledInput label='description' type='text' disabled={!this.props.edit} placeholder='รายละเอียดอื่นๆ เช่น ขนยาว, น้องมีแผล, กลัวคน ผอมมาก' defaultValue={this.props.animalDescription} />
                    <div style={{height:'30vh'}}>
                        <GoogleMapReact
                            defaultCenter={
                                {lat: this.props.geo.lat, lng: this.props.geo.lng}
                            }
                            defaultZoom={13}
                        > 
                            <AnimalMarker img={this.props.photoUrls && this.props.photoUrls[0] || '/image/shelter32.png'} lat={this.props.geo.lat} lng={this.props.geo.lng} text={this.props.animalName}/>
                        </GoogleMapReact>
                    </div>
                </div>
                <div className='ui buttongroup'>
                    <Button hidden={this.props.edit} onClick={this.beginEdit.bind(this)}> Edit </Button>
                    <Button className='positive' hidden={!this.props.edit} onClick={this.onSubmit.bind(this)}> Save </Button>
                    <Button className='negative' hidden={!this.props.edit || this.props.animalName==null} onClick={this.onDecline.bind(this)}> Cancel </Button>
                </div>
            </div>
        )
    }

    uploadImage(data_urls){
        const promises = []
        data_urls.map( i => {
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
                return v.toString(16)
            })
            const gs = this.storage.ref(`${firebase.auth().currentUser.uid}/images/${uuid}`)
            promises.push(gs.putString(i, 'data_url').then( r => r.metadata.downloadURLs[0] ).catch( e => console.log(e)))
        })
        return Promise.all(promises)
    }

    onSubmit(){
        const canvases = document.getElementsByClassName('camera-image')
        const images = document.getElementsByClassName('file-image')
        const urls = []
        for(let i=0; i<canvases.length; i++){
            urls.push(canvases[i].toDataURL())
        }
        for(let i=0; i<images.length; i++){
            urls.push(images[i].toDataURL())
        }
        this.uploadImage(urls)
            .then( urls => {
                const auth = firebase.auth()
                const submitValue = {
                    animalName: $('#name').val(),
                    animalType: $('#type').val(),
                    owner: {
                        id: auth.currentUser.uid,
                        displayanme: auth.currentUser.displayName,
                        email: auth.currentUser.email,
                        photo: auth.currentUser.photoURL,
                    },
                    status: 'Open',
                    view: 0,
                    breed: $('#breed').val(),
                    gender: $('#gender').val(),
                    location: $('#location').val(),
                    geo: {lat: parseFloat($('#lat').val()), lng: parseFloat($('#lng').val())},
                    description: $('#description').val(),
                    contact: $('#contact').val(),
                    photo_urls: urls.concat(this.props.photoUrls),
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                }
                const newKey = this.props.animalId || this.database.ref('/animals/').push().key
                const update = {}
                update[`/animals/${newKey}`] = submitValue
                this.database.ref().update(update)
                    .then( result => {
                        new Notification('Add animal successful!', {icon: '/image/shelter128.png'})
                        this.props.history.push('/animaldetail/' + newKey)
                        console.log(result)
                    })
                    .catch(e=>console.log(e))
            })
        this.props.dispatch(actionCreator.endEdit())
    }

    onDecline() {
        this.props.dispatch(actionCreator.endEdit())
    }

    beginEdit() {
        this.props.dispatch(actionCreator.beginEdit())
    }

}

const mapStateToProps = (store) => {
    return {
        isLoading: store.currentAnimal.isLoading,
        edit: store.currentAnimal.isEditMode,
        capture: store.currentAnimal.isCapturing,
        error: store.currentAnimal.error,
        animalId: store.currentAnimal.animalId,
        animalName: store.currentAnimal.animalName,
        photoUrls: store.currentAnimal.photo_urls,
        animalType: store.currentAnimal.animalType,
        breed: store.currentAnimal.breed,
        gender: store.currentAnimal.gender,
        foundLocation: store.currentAnimal.location,
        geo: store.currentAnimal.geo || { lat: 13.7563, lng: 100.5018 },
        contact: store.currentAnimal.owner && store.currentAnimal.owner.email || (store.authen && firebase.auth().currentUser.email),
        animalDescription: store.currentAnimal.description,
        status: store.currentAnimal.status,
        view: store.currentAnimal.view
    }
}

export default withRouter(connect(mapStateToProps)(AnimalDetail))