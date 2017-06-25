import React from 'react'
import {withRouter} from 'react-router'
import GoogleMapReact  from 'google-map-react'
import AnimalList from '../component/AnimalList'
import {connect} from 'react-redux'
import * as firebase from 'firebase'

import * as actionCreator from '../redux/action/animal'
import {AnimalMarkerWithLink} from '../component/ui'

class AnimalPage extends React.Component{
    constructor(){
        super()
        this.state = {
            mode: 1,
        }
    }

    componentDidMount(){
        this.refetch()
    }

    componentDidUpdate(next){
        if (next.location.pathname + next.location.search !== this.props.location.pathname + this.props.location.search){
            this.refetch()
        }
    }
    
    render(){ 
        if(this.state.mode == 2){
            const cenLat = this.props.animals.map( a => a.geo.lat).reduce((p, c) => p+c) / this.props.animals.length
            const cenLng = this.props.animals.map( a => a.geo.lng).reduce((p, c) => p+c) / this.props.animals.length
            return (
                <div className='ui container'>
                    <div className='ui icon buttons'>
                        <button className={'ui button '+(this.state.mode==1?'orange':'')} onClick={()=>{this.setState({mode:1})}}>
                            <i className={'eye icon '+(this.state.mode==1?'white':'')} />
                        </button>
                        <button className={'ui button '+(this.state.mode==2?'orange':'')} onClick={()=>{this.setState({mode:2})}}>
                            <i className={'map icon '+(this.state.mode==2?'white':'')} />
                        </button>
                    </div>

                    <div id='map-mode' style={{height:'75vh'}}>
                        <GoogleMapReact
                            defaultCenter={{lat: cenLat, lng: cenLng}}
                            defaultZoom={8}
                            > 
                        { 
                            this.props.animals.map( a =>
                                <AnimalMarkerWithLink
                                    key={a.key}
                                    lat={a.geo.lat}
                                    lng={a.geo.lng}
                                    onClick={()=>{this.props.history.push('/animaldetail/' + a.key)}}
                                    img={a.photo_urls[0] || '/image/shelter32.png'}
                                />
                            )
                        }
                        </GoogleMapReact>
                    </div>
                </div>
            )
        }   
        else{
            return(
                <div className='ui container'>
                    <div className='ui icon buttons'>
                        <button className={'ui button '+(this.state.mode==1?'orange':'')} onClick={()=>{this.setState({mode:1})}}>
                            <i className={'eye icon '+(this.state.mode==1?'white':'')} />
                        </button>
                        <button className={'ui button '+(this.state.mode==2?'orange':'')} onClick={()=>{this.setState({mode:2})}}>
                            <i className={'map icon '+(this.state.mode==2?'white':'')} />
                        </button>
                    </div>
                    <div>
                        <AnimalList animals={this.props.animals}/>
                    </div>    
                </div>
            ) 
        }        
    }

    onChildAdded(filterFunc){
        return (r) => {
            console.log(r.val())
            console.log(filterFunc)
            if(filterFunc){
                if(filterFunc(r.val()))
                    this.props.dispatch(actionCreator.addAnimal({key:r.key, ...(r.val())}))
            }else{
                this.props.dispatch(actionCreator.addAnimal({key:r.key, ...(r.val())}))
            }
        }
    }

    refetch(){
        const animals = firebase.database().ref('animals')
        this.props.dispatch(actionCreator.resetAnimal())
        const status = this.props.match.params.type || 'Open'
        const by = this.props.location.search.includes('by')
        const sort = this.props.match.query && this.props.match.query.sort || 'timestamp'

        let query, filterFunc
        if(by){
            query = animals.orderByChild('owner/id').equalTo(firebase.auth().currentUser.uid)
            filterFunc = (a)=>a.status==status
        }else{
            query = animals.orderByChild('status').equalTo(status)
        }
        query.on('child_added', this.onChildAdded(filterFunc).bind(this))
    }
}

const mapStateToProps = (store) => {
    return {
        animals: store.animals
    }
}

export default withRouter(connect(mapStateToProps)(AnimalPage))
