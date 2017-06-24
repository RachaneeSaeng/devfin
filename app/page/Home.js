import React from 'react'
import AddButton from '../component/AddButton'
import { connect } from 'react-redux'
import {Button} from 'semantic-ui-react'
import FirebaseUtil from '../../script/FirebaseUtil'
import { addAnimal } from '../redux/action/animal'
import AnimalPhotoList from '../component/AnimalPhotoList'

class Home extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        Promise.all([FirebaseUtil.getDogs()]).then(function (dogArr) {
            this.props.dispatch(addAnimal(dogArr[0]));
        }.bind(this), function (err) {
            // error occurred
            console.log('Cannot download image from server');
        });
    }

    openAddAnimal() {
        if (FirebaseUtil.currentUser) {
            this.props.history.push('/addanimal')
        }
        else {
            this.props.history.push('/login?redirectUrl=addanimal')
        }
    }

    openAnimalList() {
        this.props.history.push('/animalpage')
    }

    render() {
        return (
            <div>
                <h2>Home page</h2>
                <AddButton parentPage={this}/>
                {'  '}
                <Button onClick={() => this.props.history.push('/animalpage')}>Adopt</Button>
                <div>
                    <p>Recently Added: </p>
                    <header>
                        {
                            this.props.animals.length > 0 ? <AnimalPhotoList sortingBy='time'/> : null
                        }
                    </header>
                    <p>Popular: </p>
                    <header>
                        {
                            this.props.animals.length > 0 ? <AnimalPhotoList sortingBy='views'/> : null
                        }
                    </header>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        animals: store.animals,
    }
}

export default connect(mapStateToProps)(Home)