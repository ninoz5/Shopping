import React, { Component } from 'react';
import './Header.css'
import {Link} from 'react-router-dom'
import {BsCart4,BsSearch} from 'react-icons/bs'
class Header extends Component {
	constructor(props){
		super(props)
		this.state  = {
			search:''
		}
	}
	search(){

	}

	render() {
		const user = JSON.parse(sessionStorage.getItem('user'))
		var cartlink;
		var userheader;
		var cart;
		if(user !== null){
			cartlink = '/user/id/'  + user[1] + '/cart'
			userheader = <React.Fragment>
							<Link to = '/'>{user[0]}</Link>
							<Link onClick = {() => sessionStorage.removeItem('user')} to = '/'> Logout </Link>
						</React.Fragment>
			cart = <React.Fragment>
					<div className = 'cart'>
						<Link to = {cartlink}><BsCart4/> </Link>
						</div>
					</React.Fragment>
		}else{
			userheader = <React.Fragment>
							<Link to = '/login'>Login</Link>
						</React.Fragment>
		}
		return (
			<div id = 'Header'>
			<div className = 'headercontent'>
				<Link  class = 'title' to = '/'><span>Anis Express </span></Link>
				<input className = 'searchbar' type = 'text' placeholder = 'Search items'/>
				<button className = 'searchbutton' onClick = {() => this.search()}> <BsSearch/> </button>
				{cart}
				<div className = 'user'>
				{userheader}
				</div>
				</div>
			</div>
		);
	}
}
export default Header;