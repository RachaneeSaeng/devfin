import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import * as firebase from 'firebase'
import * as actionCreator from '../redux/action/currentAnimal'

import {LabeledInput, Button} from '../component/ui'

class AnimalDetail extends React.Component {
    database = firebase.database()
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
                <Button hidden={!this.props.edit}>
                    <i className='ui icon camera'></i>
                </Button>
                <Button hidden={!this.props.edit}>
                    <i className='ui icon pin'></i>
                </Button>
                <div id='detail-body'>
                    <LabeledInput label='name' type='text' disabled={!this.props.edit} placeholder='เจ้าด่าง' defaultValue={this.props.animalName} />
                    <LabeledInput label='type' type='text' disabled={!this.props.edit} placeholder='หมา' defaultValue={this.props.animalType} />
                    <LabeledInput label='breed' type='text' disabled={!this.props.edit} placeholder='ไซบีเรียน ฮัสกี้' defaultValue={this.props.breed}/>
                    <LabeledInput label='gender' type='text' disabled={!this.props.edit} placeholder='ผู้' defaultValue={this.props.gender}/>
                    <LabeledInput label='contact' type='text' disabled={true} defaultValue={this.props.contact || this.props.userContact}/>
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
    onSubmit(){
        console.log(this)
        const submitValue = {
            animalName: $('#name').val(),
            animalType: $('#type').val(),
            breed: $('#breed').val(),
            gender: $('#gender').val(),
            location: { lat: 13.7563, lng: 100.5018 },
            description: $('#description').val(),
            contact: $('#contact').val(),
            photo_urls: this.props.photoUrls,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        }
        const newKey = this.props.animalId || this.database.ref('/animals/').push().key
        const update = {}
        update[`/animals/${newKey}`] = submitValue
        this.database.ref().update(update).then( result => console.log(result) ).catch(err => console.log(err))
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
        contact: store.currentAnimal.contact,
        animalDescription: store.currentAnimal.description,
        userContact: store.user.contact,
    }
}

export default connect(mapStateToProps)(withRouter(AnimalDetail))