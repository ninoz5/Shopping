import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
	constructor(props){
		super(props)
		this.state = {
			username : '', password : ''
		}
	}

	handleUsernameChange = (event) => {
		this.setState({username: event.target.value})

	}
	handlePasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	handleSubmit = (event) => {


	}
	submit(){
		
		const user = JSON.parse(sessionStorage.getItem('user'))
		let url =  "http://localhost:8080/users/login"
		const body = this.state;
		 sessionStorage.removeItem('user');
		axios({
			method: "post",
			url: url,
			data: body,
		})
		.then(function(response) {
			var user = [body.username,response.data[0].id,response.data[0].admin]
			sessionStorage.setItem('user', JSON.stringify(user))
			if(user[2]=== 0){
			document.location.replace('/')
			}else if (user[2] === 1){
				document.location.replace('/Admin')
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	render() {

		const {username, password} = this.state
		

		return (
		<div className = 'loginpage'>

		<div className="wrapper fadeInDown">
		<div id="formContent">

			<h2 className="active" id = 'signin'> Sign In </h2>
			<h2 className="inactive underlineHover" id = 'signup'>Sign Up </h2>


			{/*<div className="fadeIn first">
		<img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
		</div>
*/}

		
		<input type="text" id="login" value = {this.state.username} onChange= {this.handleUsernameChange} className="fadeIn second" name="login" placeholder="login"/>
		<input type="text" id="password" value = {this.state.password} onChange = {this.handlePasswordChange} className="fadeIn third" name="login" placeholder="password"/>
		<input type = 'submit' onClick ={() => this.submit()} className ="fadeIn fourth" value="Log In"/>		


		<div id="formFooter">
		<a className="underlineHover" href="#">Forgot Password?</a>
		</div>

		</div>
		</div>

		</div>

		);
	}
}
export default Login;