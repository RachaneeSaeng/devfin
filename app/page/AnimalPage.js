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
            LocList: [],
            CenterLat: 0,
            CenterLng: 0,
        }
    }

    PerformSearch(){
        const text = $('#search-text-box').val();
        
    }

    ChangeMode(m) {
        if(m == 2){
            var centerLat = 0
            var centerLng = 0

            this.state.LocList.map((loc) =>
                {
                    centerLat += loc.lat
                    centerLng += loc.lng 
                }                        
            ) 

            if (this.state.LocList.length > 0){
                centerLat = centerLat / this.state.LocList.length 
                centerLng = centerLng / this.state.LocList.length
            } 

            this.setState(
                {
                    CenterLat: centerLat,
                    CenterLng: centerLng,
                }
            ) 
        }

        this.setState(
            {
                mode: m
            }
        )
    }

    componentDidMount(){
        const animals = firebase.database().ref('animals')
        this.props.dispatch(actionCreator.resetAnimal())
        const status = this.props.match.params.type || 'Open'
        animals.orderByChild('status').equalTo(status).on('child_added',
            r => {
                this.props.dispatch(actionCreator.addAnimal({key:r.key, ...(r.val())}))
            })

        if(this.state.mode == 1)
        {
            $('#search-mode-card').prop('checked', true);
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
            console.log(this.state.mode)
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
}

const mapStateToProps = (store) => {
    return {
        animals: store.animals
    }
}

export default withRouter(connect(mapStateToProps)(AnimalPage))
