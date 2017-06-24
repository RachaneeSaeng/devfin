import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import * as firebase from 'firebase'
import * as actionCreator from '../redux/action/currentAnimal'

import {LabeledInput, Button} from '../component/ui'
import Camera from '../component/Camera'

class AnimalDetail extends React.Component {
    database = firebase.database()
    storage = firebase.storage()
    auth = firebase.auth()
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.dispatch(actionCreator.beginFetch())
            this.database.ref(`/animals/${this.props.match.params.id}`)
                .once( 'value', animal => {
                    const val = animal.val()
                    val.animalId = this.props.match.params.id
                    if(val)
                        this.props.dispatch(actionCreator.endFetch(val))
                    else
                        this.props.dispatch(actionCreator.createNew())
                })
        }else{
            this.props.dispatch(actionCreator.createNew())
        }
    }

    render (){
        if(this.props.isLoading){
            return (<i className='notched circle loading icon'></i>)
        }
        return(
            <div className='ui container'>
                <h1> {this.props.animalName} </h1>
                <div id='detail-images'>
                    { this.props.photoUrls.map( url => (<img key={url} src={url} alt='dog-image' />)) }
                </div>
                <Button hidden={!this.props.edit} onClick={()=>{!this.props.capture?this.props.dispatch(actionCreator.beginCapture()):this.props.dispatch(actionCreator.endCapture())}}>
                    <i className='ui icon camera'></i>
                </Button>
                {this.props.capture?<Camera />:null}
                <Button hidden={!this.props.edit}>
                    <i className='ui icon pin'></i>
                </Button>
                <div id='detail-body'>
                    <LabeledInput label='name' type='text' disabled={!this.props.edit} placeholder='เจ้าด่าง' defaultValue={this.props.animalName} />
                    <LabeledInput label='type' type='text' disabled={!this.props.edit} placeholder='หมา' defaultValue={this.props.animalType} />
                    <LabeledInput label='breed' type='text' disabled={!this.props.edit} placeholder='ไซบีเรียน ฮัสกี้' defaultValue={this.props.breed}/>
                    <LabeledInput label='gender' type='text' disabled={!this.props.edit} placeholder='ผู้' defaultValue={this.props.gender}/>
                    <LabeledInput label='contact' type='text' disabled={true} value={this.props.contact}/>
                    <LabeledInput label='description' type='text' disabled={!this.props.edit} placeholder='รายละเอียดอื่นๆ เช่น ขนยาว, น้องมีแผล, กลัวคน ผอมมาก' defaultValue={this.props.animalDescription} />
                </div>
                <div className='ui buttongroup'>
                    <Button hidden={this.props.edit} onClick={this.beginEdit.bind(this)}> Edit </Button>
                    <Button className='positive' hidden={!this.props.edit} onClick={this.onSubmit.bind(this)}> Save </Button>
                    <Button className='negative' hidden={!this.props.edit} onClick={this.onDecline.bind(this)}> Cancel </Button>
                </div>
            </div>
        )
    }

    uploadImage(images){
        const promises = []
        images.map( i => {
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
                return v.toString(16)
            })
            const gs = this.storage.ref(`${this.auth.currentUser.uid}/images/${uuid}`)
            promises.push(gs.put(i).then( r => r.metadata.downloadURLs[0] ).catch( e => console.log(e)))
        })
        return Promise.all(promises)
    }

    onSubmit(){
        const canvases = document.getElementsByClassName('camera-image')
        const srcs = []
        const blobPromises = []
        for(let i=0; i<canvases.length; i++){
            blobPromises.push(new Promise( (resolve, reject) => {
                canvases[i].toBlob( b => resolve(b))
            }))
        }
        Promise.all(blobPromises)
            .then( blobs => this.uploadImage(blobs) )
            .then( urls => {
                const submitValue = {
                    animalName: $('#name').val(),
                    animalType: $('#type').val(),
                    breed: $('#breed').val(),
                    gender: $('#gender').val(),
                    location: { lat: 13.7563, lng: 100.5018 },
                    description: $('#description').val(),
                    contact: $('#contact').val(),
                    photo_urls: urls.concat(this.props.photoUrls),
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                }
                const newKey = this.props.animalId || this.database.ref('/animals/').push().key
                const update = {}
                update[`/animals/${newKey}`] = submitValue
                this.database.ref().update(update).then( result => console.log(result) ).catch(err => console.log(err))
                new Notification('Add animal successful!', {icon: '/image/shelter128.png'})
                this.props.history.push('/animaldetail/' + newKey)
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
        animalId: store.currentAnimal.animalId,
        animalName: store.currentAnimal.animalName,
        photoUrls: store.currentAnimal.photo_urls,
        animalType: store.currentAnimal.animalType,
        breed: store.currentAnimal.breed,
        gender: store.currentAnimal.gender,
        foundLocation: store.currentAnimal.location,
        contact: store.currentAnimal.contact || (store.authen && firebase.auth().currentUser.email),
        animalDescription: store.currentAnimal.description,
    }
}

export default withRouter(connect(mapStateToProps)(AnimalDetail))