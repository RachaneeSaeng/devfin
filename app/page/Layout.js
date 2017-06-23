import React from 'react'
// import {Link} from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

class Layout extends React.Component {
    state = { visible: false }

  constructor(){
        super()
        this.menuLinks = {
            'Home':'/#/', 
            'อยากมีบ้าน':'/#/animalpage',
            'มีบ้านแล้ว':'/#/timeline',
            'Popular':'/#/animalpage?type=popular',
            'Favorite':'/#/animalpage?type=favorite',
            'My Animal':'/#/animalpage?type=myanimal',
            'My Request':'/#/animalpage?type=myrequest',
            'My Adopted':'/#/animalpage?type=myadopted',
            'Notification':'/#/notification',
            'My Profile':'/#/myprofile',
            'ติดต่อเรา':'/#/contactus',
            'ออกจากระบบ':'/#/login',
        }
        //this.menuLinks = ['/','/animal', '/Login']
    }
    
    handleItemClick(e, { name }) {
        this.setState({ activeItem: name, visible: false })
    }

  toggleVisibility() {      
      this.setState({ visible: !this.state.visible })
    }

  render() {  
    var closeStyle = {
        'float': 'right',
        'display': 'inline-block',
        'padding': '5px 10px',
        'color': '#ddd',
        'cursor': 'pointer'
    };

    var headerStyle = {
        'margin': '0.6rem'        
    };

    var thisObj = this;
    const visible  = this.state.visible
    const activeItem = this.state.activeItem
    var menuItems = [];
    for(var page in this.menuLinks) {        
        if(this.menuLinks.hasOwnProperty(page)) {
            //menuItems.push(<Menu.Item key={page} name={page} onClick={this.handleItemClick.bind(thisObj, this.menuLinks[page])}></Menu.Item>);
            menuItems.push(
                <Menu.Item key={page} name={page} href={this.menuLinks[page]} onClick={this.handleItemClick.bind(thisObj)} active={activeItem === page}>
                   {page}
                </Menu.Item>
                );
        }
    }

    return (           
        <div>  
            <div>
                <Sidebar.Pushable as={Segment}>                    
                    <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical inverted>
                        <div>
                            <span id='close' style={closeStyle} onClick={this.toggleVisibility.bind(this)}>X</span>
                            <br/><br/><br/><br/>
                        </div>
                        {menuItems}
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div className="ui top attached menu">
                            <a className="item" onClick={this.toggleVisibility.bind(this)}>
                                <i className="sidebar icon"></i>
                                Menu
                            </a>
                            <Header as='h2' style={headerStyle}>
                                <Image shape='circular' src='/image/shelter128.png' />
                                {' '}AniHome                                
                            </Header>
                        </div> 
                        <Segment basic>
                            <main>{this.props.children}</main>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div> 
        </div>    
    )
  }
}

export default Layout
// {this.menuLinks.map( page => 
                    //     //<Menu.Item key={page} name={page}><Link to={page}>{page}</Link></Menu.Item>
                    //      <Link key={page} to={page}> {page} </Link>
                    // )}
