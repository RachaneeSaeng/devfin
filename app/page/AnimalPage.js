import React from 'react'
import AnimalEditor from '../component/AnimalEditor'
import AnimalList from '../component/AnimalList'

class AnimalPage extends React.Component{
    constructor(){
        super()
        this.alreadyHasAnimalEditor = false
    }

    componentWillMount(){
        this.alreadyHasAnimalEditor = $('#animal-editor').length>0?true:false
    }

    render(){
        return (
            <div className='ui container'>
                The list
                <div className='ui button teal' onClick={addAnimal.bind(this)}> + </div>
                <AnimalList />
                {this.alreadyHasAnimalEditor?null:<AnimalEditor />}
            </div>
        )
    }
}

function addAnimal(e){
    //This could make Sematic-ui create multiple <AnimalEditor />
    //using this.alreadyHasAnimalEditor to check
    $('#animal-editor').modal('show', {allowMultiple:false})
}

export default AnimalPage
