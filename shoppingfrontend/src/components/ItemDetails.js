import React, { Component } from 'react';
import Header from './Header'
import shirt1 from '../static/shirt1.jfif'
import './ItemDetails.css'
import axios from 'axios'
class ItemDetails extends Component {
	constructor(props){
		super(props)
		this.state= {data:[]}
	}
	addToCart(id){
		console.log(id)
		const user = JSON.parse(sessionStorage.getItem('user'))
		let url =  "http://localhost:8080/users/id/" + user[1] + '/addToCart'
		const body = this.state;
		axios({
			method: "post",
			url: url,
			data: {id:id}
		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		});
	
}
componentDidMount() {
	this.populateData()
}
callBackendAPI = async (url) => {
	const response = await fetch(url);
	const body = await response.json();
	if (response.status !== 200) {
		throw Error(body.message) 
	}
	return body;
};
populateData(){
	let url =  "http://localhost:8080/items/id/" + this.props.match.params.id
	this.callBackendAPI(url)
	.then(res => {
		this.setState({ data: res})
	})
	.catch(err => console.log(err));
}
render() {
	const {data} = this.state
	var add;
	if(data.stock !== 0){
		add = <button className = 'daddtocart' onClick = {() => this.addToCart(data.id)}> Add to cart </button>
	}else{
		add = <button className = 'daddtocart'>Out of stock!</button>
	}
	return (
		<div>
		<div className = 'mainheader'>
		<Header />
		</div>
		<div className = 'dItemDetails'>


		<div className  = 'dleft'>
		<img className = 'ditemimage' src = {`data:image/jpeg;base64,${data.image}`}/>
		<div className = 'doptions'>
		</div>
		<label className = 'dprice'> {data.price} </label>
		<label className = 'dname'> {data.name} </label>
		</div>
		<div className  = 'dright'>
		<label className = 'ddescription'> {data.description} </label><br />


		</div>
		</div>
		<div className = 'dbottom'>
		{add}
		</div>
		</div>
		);
}
}
export default ItemDetails