import React from 'react'
import GoogleMapReact  from 'google-map-react'
import AnimalList from '../component/AnimalList'
import {connect} from 'react-redux'

const CustomMarker = ({ text }) => <div className='markerCss'><b className='textCss'>{text}</b></div>;

class AnimalPage extends React.Component{
    constructor(){
        super()
        this.state = {
            mode: 1,
            LocList: [],
            CenterLat: 0,
            CenterLng: 0,
        }

        this.Loc1 = {name: 'Place1', lat: 13.746108, lng: 100.539240}
        this.Loc2 = {name: 'Place2', lat: 13.746088, lng: 100.534355}
        this.Loc3 = {name: 'Place3', lat: 13.744468, lng: 100.529909}
        this.Loc4 = {name: 'Place4', lat: 13.738378, lng: 100.532053}
        this.Loc5 = {name: 'Place5', lat: 13.788417, lng: 100.605331}

        this.state.LocList.push(this.Loc1)
        this.state.LocList.push(this.Loc2)
        this.state.LocList.push(this.Loc3)
        this.state.LocList.push(this.Loc4)
        this.state.LocList.push(this.Loc5)
    }

    PerformSearch(){
        var text = $('#search-text-box').val();

        //perform search and set state
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
        if(this.state.mode == 1)
        {
            $('#search-mode-card').prop('checked', true);
        }
    }
    
    render(){ 

        if(this.state.mode == 2){
            return (
                <div className='ui container'>
                    <div id='search-control' className='searchControlCss'>
                        <form onSubmit={this.PerformSearch.bind(this)}>
                            <input id='search-text-box' type='text' className='searchTextBox' placeholder='Search...'/>
                        </form>
                        <div>
                            <input id='search-mode-card' type='radio' name='mode' onClick={this.ChangeMode.bind(this, 1)} className='radioCss'/><label className='labelCss'>View by Card</label>
                            <input id='search-mode-map' type='radio' name='mode' onClick={this.ChangeMode.bind(this, 2)} className='radioCss'/><label className='labelCss'>View By Map</label>
                        </div>                    
                    </div>

                    <div id='map-mode' >
                        <GoogleMapReact
                            defaultCenter={
                                {lat: this.state.CenterLat, lng: this.state.CenterLng}
                            }
                            defaultZoom={13}
                            > 
                        { 
                            this.state.LocList.map((loc) =>
                                <CustomMarker
                                    lat={loc.lat}
                                    lng={loc.lng}
                                    text={loc.name} />
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
                    <div id='search-control' className='searchControlCss'>
                        <form onSubmit={this.PerformSearch.bind(this)}>
                            <input id='search-text-box' type='text' className='searchTextBox' placeholder='Search...'/>
                        </form>
                        <div>
                            <input id='search-mode-card' type='radio' name='mode' onClick={this.ChangeMode.bind(this, 1)} className='radioCss'/><label className='labelCss'>View by Card</label>
                            <input id='search-mode-map' type='radio' name='mode' onClick={this.ChangeMode.bind(this, 2)} className='radioCss'/><label className='labelCss'>View By Map</label>
                        </div>                    
                    </div>
                    <div>
                        <AnimalList />   
                        <table className='tableCss'>
                            <tr className='cardContainerCss'>
                                <td className='cardPartialLeftCss' align='left'>
                                    <img src='http://images.shibashake.com/wp-content/blogs.dir/7/files/2010/03/IMG_2431-520x390.jpg' className='imgCss'/>
                                </td>
                                <td className='cardPartialRightCss' align='right'>
                                    <div className='textLineCss'><label>ชื่อ: </label> John</div>
                                    <div className='textLineCss'><label>อายุ: </label> 8</div>
                                    <div className='textLineCss'><label>เพศ: </label> ผู้</div>
                                    <div className='textLineCss'><label>สถานที่: </label> บางกะปิ</div>
                                </td>
                            </tr>

                            <tr className='cardContainerCss'>
                                <td className='cardPartialLeftCss' align='left'>
                                    <img src='http://images.shibashake.com/wp-content/blogs.dir/7/files/2010/03/IMG_2431-520x390.jpg' className='imgCss'/>
                                </td>
                                <td className='cardPartialRightCss' align='right'>
                                    <div className='textLineCss'><label>ชื่อ: </label> John</div>
                                    <div className='textLineCss'><label>อายุ: </label> 8</div>
                                    <div className='textLineCss'><label>เพศ: </label> ผู้</div>
                                    <div className='textLineCss'><label>สถานที่: </label> บางกะปิ</div>
                                </td>
                            </tr>
                        </table>      
                    </div>    
                </div>
            ) 
        }        
    }
}

export default connect()(AnimalPage)
