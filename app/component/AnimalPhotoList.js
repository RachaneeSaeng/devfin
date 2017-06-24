import React from 'react'
import { connect } from 'react-redux'

class AnimalPhotoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {(() => {
                    switch (this.props.sortingBy) {
                        case 'time':
                            return this.props.animals.sort(compareTimeStamp).map(d => <AnimalPhoto key={d.id} url={d.photo_urls[0]} />)
                        default:
                            null
                    }
                })()}
            </div>
        )
    }
}

const AnimalPhoto = ({ url }) => (
    //<div key={a.id}>{<img src={a.photo_urls[0]} alt />}</div>
    <div >{<img src={url} alt />}</div>
)


function compareTimeStamp() {
    if (a.timestamp < b.timestamp)
        return -1;
    if (a.timestamp > b.timestamp)
        return 1;
    return 0;
}

const mapStateToProps = (store) => {
    return {
        animals: store.animals,
    }
}

export default connect(mapStateToProps)(AnimalPhotoList)
