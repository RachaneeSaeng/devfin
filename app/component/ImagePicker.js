import React from 'react'

class ImagePicker extends React.Component {
    render(){
        return(
            <div className='ui container'>
                <input type='file' onChange={this.loadPreview.bind(this)} multiple='multiple' accept='image/*'/>
                <div id='file-preview'></div>
            </div>
        )
    }

    loadPreview(e){
        const files = e.target.files
        const preview = document.getElementById('file-preview')
        $('#file-preview').empty()
        for(let i=0, f; f=files[i] ; i++){
            const f = files[i]
            const reader = new FileReader()
            reader.onload = ( e ) => {
                const img = document.createElement('img')
                img.src = e.target.result
                const canvas = document.createElement('canvas')
                canvas.setAttribute('width', 256)
                canvas.setAttribute('height', 256)
                canvas.className += 'file-image'
                const srcWidth = img.width
                const srcHeight = img.height
                const minLength = Math.min(srcWidth, srcHeight)
                const scale =  minLength / 256
                const center = {x: srcWidth/2, y: srcHeight/2}
                const x = center.x - minLength / 2
                const y = center.y - minLength / 2
                canvas.getContext('2d').drawImage(img, x, y, minLength, minLength, 0, 0, 256, 256)
                document.getElementById('file-preview').appendChild(canvas)
            }
            reader.readAsDataURL(f)
        }
    }
}

export default ImagePicker
