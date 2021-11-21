import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom'
import AdminView from './AdminView'
class Admin extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            userDisplay: 'none', itemDisplay:'none'
        }
    }
    show(which){
        if(which==='items') {
            if(this.state.itemDisplay === 'none')
            this.setState({itemDisplay:''})
            else this.setState({itemDisplay:'none'})
        }
        else if(which==='users'){
             if(this.state.userDisplay === 'none')
            this.setState({userDisplay:''})
            else this.setState({userDisplay:'none'})
        } 
    }
    render() {
        const {itemDisplay,userDisplay} = this.state
        return (
            <div>
            This admin page<br/>
            <button onClick = {() => this.show('items')}>View Items </button> <br/>
            <div  style={{display:itemDisplay}}>
            <AdminView view = 'items' link = 'Admin/additem'/>
            </div>
            <button onClick = {() => this.show('users')}>View Users </button>
            <div  style={{display: userDisplay}}>
            <AdminView view = 'users'  link = 'Admin/adduser' />
            </div>
            <Link to = '/'> aa</Link>
            </div>
        );
    }
}

export default Admin;
