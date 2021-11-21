import React, { Component, PropTypes } from 'react';
import ShoppingCard from './ShoppingCard'
import './AvailableItems.css'


class AvailableItems extends Component {
    

    constructor(props) {
        super(props);
        this.state= {
        	data: []
        }
    }
    componentDidMount() {
     	this.populateData()
      
       }
    componentWillReceiveProps(nextProps) {
        this.populateData()
        

    }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
  	let url =  "http://localhost:8080/items/"
  	if(this.props.cat !== ''){
  		url += "cat/" + this.props.cat
  	}
    const response = await fetch(url);
    const body = await response.json();
    
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    
    return body;
  };
  populateData(){
  	this.callBackendAPI()
      .then(res => {
      	this.setState({ data: res})

      	})
      .catch(err => console.log(err));

  }
   

    render() {

        return (
        	
            <div className = 'itemsforshow'>
        <div className = 'available'> 

            {this.state.data.map((item,i) => 
					<ShoppingCard   id = {item.id}
					 				className = 'item' 
					 				name = {item.name} 
					 				image = {item.image} 
					 				options = 'colors' 
					 				price = {item.price} 
					 				description = {item.description} 
					 				rating = {item.rating} 
					 				shipping = {item.shipping}
                                    stock = {item.stock}
                                    key = {item.id}/>
					 			)
        	}

          </div>
     		</div>
        );
    }
}

export default AvailableItems;
