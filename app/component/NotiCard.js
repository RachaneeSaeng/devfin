import React from 'react'
import { Grid, Image, Divider, Message } from 'semantic-ui-react'

class NotiCard extends React.Component {    
    render() {
        return (  
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={8} textAlign='left'>
                    <Grid columns='2'>
                        <Grid.Column width='5'>
                            <Image src={this.props.carddata.animalPhotoUrl} />
                        </Grid.Column>
                        <Grid.Column width='11'>
                                <h4>Aminal</h4>
                                <p>{this.props.carddata.animalName}</p>
                                <p>{this.props.carddata.animalLocation}</p>
                                <p>{this.props.carddata.animalDesc}</p>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>  
                <Grid.Column mobile={16} tablet={16} computer={8} textAlign='right'>
                <Grid columns='2'>                        
                        <Grid.Column width='11'>
                                <h4>{this.props.carddata.notiType == 'request' ? 'Requestor': 'Actor'}</h4>
                                <p>{this.props.carddata.actorName}</p>
                                <p>{this.props.carddata.actorEmail}</p>
                                <p>{this.props.carddata.timestamp}</p>
                        </Grid.Column>
                        <Grid.Column width='5'>
                            <Image src={this.props.carddata.actorPhotoUrl} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>                         
            </Grid> 
        )
    }
}

export default NotiCard