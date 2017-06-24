import React from 'react'

class Notification extends React.Component {
    componentDidMount() {
        Promise.all([FirebaseUtil.getDogs()]).then(function (dogArr) {
            this.props.dispatch(addAnimal(dogArr[0]));
        }.bind(this), function (err) {
            // error occurred
            console.log('Cannot download image from server');
        });
    }
    render() {
        return (            
            <h1> Notification </h1>
        )
    }
}

export default Notification