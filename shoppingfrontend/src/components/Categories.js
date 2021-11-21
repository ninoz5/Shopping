import React, { Component } from 'react';
import './ShoppingCard.css'
import {Link} from 'react-router-dom'
import Category from './Category'
import './Categories.css'
class Categories extends Component {
	constructor(props){
	    super(props)
	    this.state= {data:[]}
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
  render(){
		return (
			<div className = 'categories'>
			Categories
			<Link className = 'category'to = '/' > All </Link>
			 	{this.state.data.map((name,i) => 
					<Category  key = {i} name = {name}/> )}
			 	
			</div>

		);
	}
}
export default Categories;
