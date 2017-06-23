import React from 'react'
import {connect} from 'react-redux'

class AnimalList extends React.Component{
    render(){
        return (
            <div>
                {this.props.animals.map( d => <Animal key={d.name} name={d.name} id={d.id} />)}
            </div>
        )
    }
}

const Animal = ({name, id}) => (
    <div>
        name: {name}<br/>
        id: {id}
    </div>
)

const mapStateToProps = (store) => {
    return {
        animals: store.animals,
    }
}

export default connect(mapStateToProps)(AnimalList)
