import React from 'react'

class Camera extends React.Component{
    componentDidMount(){
        const live = document.getElementById('live-camera')
        navigator.mediaDevices.getUserMedia({video: true})
            .then ( vid => {
                live.src = window.URL.createObjectURL(vid)
                live.play()
            })
            .catch ( err => {
                alert(err)
            })

    }

    render(){
        return (
            <div>
                <video id='live-camera' style={{height:'80vh'}}></video>
                <div className='ui button blue' onClick={captureImage.bind(this)}> Capture </div>
                <div id='preview'></div>
            </div>
        )
    }
}

function captureImage(){
    const live = document.getElementById('live-camera')
    const canvas = document.createElement('canvas')
    canvas.getContext('2d').drawImage(live, 0, 0)
    document.getElementById('preview').appendChild(canvas)
}

export default Camera
