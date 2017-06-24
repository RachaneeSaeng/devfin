import React from 'react'

class Camera extends React.Component{
    stream = null
    componentDidMount(){
        const live = document.getElementById('live-camera')
        navigator.mediaDevices.getUserMedia({video: true})
            .then ( vid => {
                live.src = window.URL.createObjectURL(vid)
                live.play()
                this.stream = vid
            })
            .catch ( err => {
                alert(err)
            })
    }

    componentWillUnmount(){
        const live = document.getElementById('live-camera')
        live.pause()
        live.src = ''
        if (this.stream) this.stream.getTracks()[0].stop()
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
    canvas.setAttribute('width', 256)
    canvas.setAttribute('height', 256)
    canvas.className += 'camera-image'
    const srcWidth = live.offsetWidth
    const srcHeight = live.offsetHeight
    const minLength = Math.min(srcWidth, srcHeight)
    const scale =  minLength / 256
    const center = {x: srcWidth/2, y: srcHeight/2}
    const x = center.x - minLength / 2
    const y = center.y - minLength / 2
    canvas.getContext('2d').drawImage(live, x, y, minLength, minLength, 0, 0, 256, 256)
    document.getElementById('preview').appendChild(canvas)
}

export default Camera
