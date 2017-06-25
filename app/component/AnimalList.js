import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class AnimalList extends React.Component{
    render(){
        return (            
            <table className='tableCss'>
                <tbody>
                    {this.props.animals.map( 
                        d => (
                            <Animal
                                key = {d.key}
                                keyName = {d.key}
                                img = {d.photo_urls[0]}
                                name = {d.animalName} 
                                type = {d.animalType} 
                                gender = {d.gender} 
                                flocation = {d.loccation}
                            />
                        )
                    )}
                </tbody>
            </table>
        )
    }
}

class animal extends React.Component{
    render(){
        const {keyName, img, name, type, gender, flocation, history} = this.props
        return (
            <tr className='cardContainerCss' onClick={()=>{history.push('/animaldetail/'+keyName)}}>
                <td className='cardPartialLeftCss'>
                    <img src={img} className='imgCss'/>
                </td>
                <td className='cardPartialRightCss'>
                    <div className='textLineCss'><label>ชื่อ: </label> {name} </div>
                    <div className='textLineCss'><label>ประเภท: </label> {type} </div>
                    <div className='textLineCss'><label>เพศ: </label> {gender} </div>
                    <div className='textLineCss'><label>สถานที่: </label> {flocation} </div>
                </td>
                <td className='cardPartialIcon'>
                    <i className='empty star icon favIcon' fontSize='8em'></i>
                </td>
            </tr>
        )
    }
}
const Animal = withRouter(animal)

export default AnimalList
