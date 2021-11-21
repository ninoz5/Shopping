import React, { Component, PropTypes } from 'react';
import axios from 'axios'

class AddItem extends Component {


	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			image: '',
			price: 0, 
			stock:0, 
			category:'top',
			data:[],
		}
	}
	componentDidMount() {
		this.callBackendAPI()
		.then(res => {
			var dummyArray = []
			for(var i = 0; i < res.length; i++){
				dummyArray.push(res[i].name)
			}
			this.setState({ data: dummyArray})
		})
		.catch(err => console.log(err));

	}
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
    	const response = await fetch("http://localhost:8080/category");
    	const body = await response.json();

    	if (response.status !== 200) {
    		throw Error(body.message) 
    	}
    	return body;
    };
    handleNameChange = (event) => {
    	this.setState({name: event.target.value})
    }
    handleCatChange = (event) => {
    	this.setState({category: event.target.value})
    }
    handleDescChange = (event) => {
    	this.setState({description: event.target.value})
    }
    handlePriceChange = (event) => {
    	this.setState({price: event.target.value})
    }
    handleStockChange = (event) => {
    	this.setState({stock: event.target.value})
    }
    handleImageChange = (event) => {
    	this.setState({image: event.target.files[0]})
    }

    createItem(){
    	let url =  "http://localhost:8080/items/additem" 
    	const body = this.state;
    	console.log(body)
    	axios({
    		method: "post",
    		url: url,
    		data: body
    	})
    	.then(function(response) {
    		console.log(response);
    	})
    	.catch(function(error) {
    		console.log(error);
    	});
    }
    	render() {
    		const {name,description,image,price,stock,category,data} = this.state
    		return (
    			<div>
    			<label>Name </label>
    			<input type = 'text' value = {name} onChange = {this.handleNameChange} placeholder = 'Enter item name'/>
    			<label> Category </label>
    			<select value = {category} onChange = {this.handleCatChange}> 
    			{data.map((category,i) => 
    				<option  key = {i} value= {category}> {category} </option> )}

    			</select>
    			<label> Description </label>
    			<textarea value = {description} onChange = {this.handleDescChange}  placeholder = 'Enter item description'/>
    			<input type = 'number' value = {price} onChange = {this.handlePriceChange} />
    			<input type = 'number'value = {stock} onChange = {this.handleStockChange}/>
    			<label> Image </label>
    			<input type="file" name="myImage" onChange = {this.handleImageChange} />
    			<button onClick = {() => this.createItem()} >Create</button>
    			</div>
    			);
    	}
    }

    export default AddItem;
