import React from 'react'
import {connect} from 'react-redux'

class DogList extends React.Component{
    render(){
        return (
            <div>
                {this.props.dogs.map( d => <Dog key={d.name} name={d.name} id={d.id} />)}
            </div>
        )
    }
}

const Dog = ({name, id}) => (
    <div>
        name: {name}<br/>
        id: {id}
    </div>
)

const mapStateToProps = (store) => {
    return {
        dogs: store.dogs,
    }
}

export default connect(mapStateToProps)(DogList)
