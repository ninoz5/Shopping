import React, { Component } from 'react';

class Register extends Component {
	constructor(props){
		super(props)
		this.state = {
			username : '', password : '', confirm: '', email: ''
		}
		this.cpwRef = React.createRef();

		this.user = React.createRef();
	}

	handleUsernameChange = (event) => {
		this.setState({username: event.target.value}, () => {this.usernameExists(event)})
	}
	handlePasswordChange = (event) => {
		this.setState({password: event.target.value},() => {this.passwordsMatch(event)})
	}
	handleConfirmPasswordChange = (event) => {
		this.setState({confirm: event.target.value},() => {this.passwordsMatch(event)})	
	}
	handleEmailChange = (event) => {
		this.setState({email: event.target.value})
	}
	handleSubmit = (event) => {
		if(!this.passwordsMatch()){

		event.preventDefault()
		const db = this.db
		
		this.toLogin()	
		}
	}
	passwordsMatch(event){
		if(this.state.password !== this.state.confirm){
			this.cpwRef.current.setCustomValidity("Passwords don't match");
		} else {
			this.cpwRef.current.setCustomValidity('');
		}		
	}
	usernameExists(event){
		
			if (true){
				this.user.current.setCustomValidity('Username already exists')
				return true
			}else{
				this.user.current.setCustomValidity('')
				return false
			}
		
	}
	
	render() {
		const {username, password,email,confirm} = this.state
		return (
			<div>
			<form onSubmit = {this.handleSubmit}>
			<label className = 'header' >FacelessBook</label> 
			<div className = 'userEnter'>
			<div class = 'container'> 
			
			<fieldset >
			<label className = 'labels' > Username: </label>
			<input required className = 'userInput'  type ='text' ref = {this.user} value = {username} onChange = {this.handleUsernameChange} />
			</fieldset>		
			
			
			
			<fieldset >
			<label className = 'labels' > Password: </label>
			<input required className = 'userInput' id="password" type = 'password' value = {password} onChange = {this.handlePasswordChange} />
			</fieldset>
			
			
			
			<fieldset>
			<label className = 'labels'> Confirm Pw: </label>
			<input required className = 'userInput'  ref={this.cpwRef}  id="confirm_password"type = 'password' value = {confirm} onChange = {this.handleConfirmPasswordChange} />
			</fieldset>
			
			
			
			
			<fieldset>
			<label className = 'labels'> Email: </label> 
			<input  required className = 'userInput' type = 'email' value = {email} onChange = {this.handleEmailChange}/> 
			</fieldset>
			
			 
			<button id ='submit' className = 'userEnter' type = 'submit'> Register </button><br/>
			<small id= 'small'> Already have an account? <br/> <Link> Log in! </Link></small>
			</div>
			</div >
			</form>
			
			</div>
			);
	}
}
export default Register;