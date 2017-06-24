import React from 'react'
import {connect} from 'react-redux'

class AnimalList extends React.Component{
    render(){
        return (            
            <table className='tableCss'>
                {this.props.animals.map( 
                    d => <Animal name = {d.name} 
                            age = {d.name} 
                            sex = {d.sex} 
                            loc = {d.loc}/>)}
            </table>
        )
    }
}

const Animal = ({name, age, sex, loc, link}) => (
    <tr className='cardContainerCss' href={link}>
        <td className='cardPartialLeftCss'>
            <img src='http://images.shibashake.com/wp-content/blogs.dir/7/files/2010/03/IMG_2431-520x390.jpg' className='imgCss'/>
        </td>
        <td className='cardPartialRightCss'>
            <div className='textLineCss'><label>ชื่อ: </label> {name}}</div>
            <div className='textLineCss'><label>อายุ: </label> {age}</div>
            <div className='textLineCss'><label>เพศ: </label> {sex}}</div>
            <div className='textLineCss'><label>สถานที่: </label> {loc}}</div>
        </td>
        <td className='cardPartialIcon'>
            <i className='empty star icon favIcon' fontSize='8em'></i>
        </td>
    </tr>
)

const mapStateToProps = (store) => {
    return {
        animals: store.animals,
    }
}

export default connect(mapStateToProps)(AnimalList)
