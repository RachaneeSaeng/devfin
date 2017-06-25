import React from 'react'
// import {Link} from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Divider } from 'semantic-ui-react'
import {connect} from 'react-redux'
import FirebaseUtil from '../../script/FirebaseUtil'

class Layout extends React.Component {
    state = { visible: false }

    constructor(){
        super()
        this.mainMenuLinks = {
            'Home':'/#/', 
            'อยากมีบ้าน':'/#/animalpage/new',
            'มีบ้านแล้ว':'/#/animalpage/adopted',
            'Popular':'/#/animalpage/popular',           
        }
        this.myMenuLinks = {           
            'Favorite':'/#/animalpage/favorite',
            'My Animal':'/#/animalpage/myanimal',
            'My Request':'/#/animalpage/myrequest',
            'My Adopted':'/#/animalpage/myadopted',
            'Notification':'/#/notification',
            'My Profile':'/#/myprofile',            
        }    
    }
    
    handleItemClick(e, { name }) {
        this.setState({ activeItem: name, visible: false })
    }

    toggleVisibility() {      
        this.setState({ visible: !this.state.visible })
    }

    hideVisibility() {      
        if (this.state.visible) {
            this.setState({ visible: false })
        }
    }

    signOut() {
        FirebaseUtil.signOut() 
        this.setState({ activeItem: 'ออกจากระบบ', visible: false })
    }

    createMenuItems(menues) {
        var thisObj = this  
        var menuItems = []
        const activeItem = this.state.activeItem
        for(var page in menues) {        
            if(menues.hasOwnProperty(page)) {
                //menuItems.push(<Menu.Item key={page} name={page} onClick={this.handleItemClick.bind(thisObj, this.menuLinks[page])}></Menu.Item>)
                menuItems.push(
                    <Menu.Item key={page} name={page} href={menues[page]} onClick={this.handleItemClick.bind(thisObj)} active={activeItem === page}>
                        {page}
                    </Menu.Item>
                )
            }
        }
        return menuItems
    }
  
    createDefaultMenuItems(){
        var thisObj = this  
        var menuItems = []
        const activeItem = this.state.activeItem    
        // Contact us
        menuItems.push(
            <Menu.Item key='ติดต่อเรา' name='ติดต่อเรา' href='/#/contactus' onClick={this.handleItemClick.bind(thisObj)} active={activeItem === 'ติดต่อเรา'}>
                ติดต่อเรา
            </Menu.Item>
        )
        // Authen 
        if (this.props.isLoggedIn) {
            menuItems.push(
                <Menu.Item key='ออกจากระบบ' name='ออกจากระบบ' href='/#/login' onClick={this.signOut.bind(thisObj)} active={activeItem === 'ออกจากระบบ'}>
                    ออกจากระบบ
                </Menu.Item>
            )
        }
        else {
            menuItems.push(
                <Menu.Item key='เข้าสู่ระบบ' name='เข้าสู่ระบบ' href='/#/login' onClick={this.handleItemClick.bind(thisObj)} active={activeItem === 'เข้าสู่ระบบ'}>
                    เข้าสู่ระบบ
                </Menu.Item>
            )
        }
        return menuItems
    }

  render() {  
    var closeStyle = {
        'float': 'right',
        'display': 'inline-block',
        'padding': '5px 10px',
        'color': '#ddd',
        'cursor': 'pointer'
    }

    var headerStyle = {
        'margin': '0.6rem'        
    }
     
    const visible  = this.state.visible   
    const loggedIn = this.props.isLoggedIn 
    return (      
        <div>  
            <div>
                <Sidebar.Pushable as={Segment}>                    
                    <Sidebar as={Menu} animation='overlay' width='wide' visible={visible} icon='labeled' vertical inverted>
                        <div>
                            <span id='close' style={closeStyle} onClick={this.hideVisibility.bind(this)}>X</span>
                            <br/><br/><br/><br/>
                        </div>
                        {this.createMenuItems(this.mainMenuLinks)} 
                        <Divider hidden />
                        {loggedIn ? this.createMenuItems(this.myMenuLinks) : null}                        
                        {loggedIn ? <Divider hidden/> : null}
                        {this.createDefaultMenuItems()}                     
                    </Sidebar>
                    <Sidebar.Pusher onClick={this.hideVisibility.bind(this)}>
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

const mapStateToProps = (store) => {
    return {
        isLoggedIn: store.authen,
    }
}

export default connect(mapStateToProps)(Layout)
//export default Layout
// {this.menuLinks.map( page => 
                    //     //<Menu.Item key={page} name={page}><Link to={page}>{page}</Link></Menu.Item>
                    //      <Link key={page} to={page}> {page} </Link>
                    // )}
