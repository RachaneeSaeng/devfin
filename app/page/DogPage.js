import React from 'react'
import DogEditor from '../component/DogEditor'
import DogList from '../component/DogList'

class DogPage extends React.Component{
    constructor(){
        super()
        this.alreadyHasDogEditor = false
    }

    componentWillMount(){
        this.alreadyHasDogEditor = $('#dog-editor').length>0?true:false
    }

    render(){
        return (
            <div className='ui container'>
                The list
                <div className='ui button teal' onClick={addDog.bind(this)}> + </div>
                <DogList />
                {this.alreadyHasDogEditor?null:<DogEditor />}
            </div>
        )
    }
}

function addDog(e){
    //This could make Sematic-ui create multiple <DogEditor />
    //using this.alreadyHasDogEditor to check
    $('#dog-editor').modal('show', {allowMultiple:false})
}

export default DogPage
