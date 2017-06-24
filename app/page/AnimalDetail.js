import React from 'react'
import {connect} from 'react-redux'

import {LabeledInput, Button} from '../component/ui'

class AnimalDetail extends React.Component {
    componentDidMount(){
        //firebase.database().ref('/')
    }

    render (){
        return(
            <div className='ui container'>
                <h1> {this.props.animalName} </h1>
                <div id='detail-images'>
                    { this.props.photoUrls.map( url => (<img key={url} src={url} alt='dog-image' />)) }
                </div>
                <Button hidden={this.props.edit}>
                    <i className='ui icon camera'></i>
                </Button>
                <Button hidden={this.props.edit}>
                    <i className='ui icon pin'></i>
                </Button>
                <div id='detail-body'>
                    <LabeledInput label='ประเภท' type='text' disabled={!this.props.edit} placeholder='หมา' defaultValue={this.props.animalType} />
                    <LabeledInput label='พันธุ์' type='text' disabled={!this.props.edit} placeholder='ทาง' defaultValue={this.props.breed}/>
                    <LabeledInput label='เพศ' type='text' disabled={!this.props.edit} placeholder='ผู้' defaultValue={this.props.gender}/>
                    <LabeledInput label='ติดต่อผู้พบ' type='text' disabled={true} defaultValue={this.props.contact}/>
                    <LabeledInput label='รายละเอียด' type='textarea' disabled={!this.props.edit} placeholder='รายละเอียดอื่นๆ เช่น ขนยาว, น้องมีแผล, กลัวคน ผอมมาก' defaultValue={this.props.animalDescription} />
                </div>
                <div className='ui buttongroup'>
                    <Button hidden={this.props.edit}> Edit </Button>
                    <Button className='positive' hidden={!this.props.edit}> Save </Button>
                    <Button className='negative' hidden={!this.props.edit}> Cancel </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        fetch: store.currentAnimal.isFetching,
        edit: store.currentAnimal.isEditMode,
        capture: store.currentAnimal.isCapturing,
        photoUrls: store.currentAnimal.photo_urls,
        animalType: store.currentAnimal.type,
        breed: store.currentAnimal.breed,
        gender: store.currentAnimal.gender,
        location: store.currentAnimal.location,
        contact: store.currentAnimal.contact,
        animalDescription: store.currentAnimal.description,
    }
}

export default connect(mapStateToProps)(AnimalDetail)