import React, { Component, PropTypes } from 'react';
import Header from './Header'
import ShoppingCard from './ShoppingCard'
class Cart extends Component {
    
   constructor(props){
	    super(props)
	    this.state= {data:[], cost: 0}
  }
  componentDidMount() {
    this.callUserBackendAPI()
      .then(res => {
      	
      	this.setState({data:res})
      	
      	})
      .catch(err => console.log(err));
     
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callUserBackendAPI = async () => {
    var response = await fetch("http://localhost:8080/users/id/" + this.props.match.params.id);
    const body = await response.json();
   	var itemdata = []
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    var cart = JSON.stringify(body)
  	cart = JSON.parse(cart)
  	cart = JSON.parse(cart.cart)
  	for (const [key, value] of Object.entries(cart)) {
  		
		
    var response = await fetch("http://localhost:8080/items/id/" + key);
    var body2 = await response.json();
    
    if (response.status !== 200) {
      throw Error(body2.message) 
    }
    
    body2['quantity'] = value
    itemdata.push(body2)
    
    }
 
      return itemdata;
  };
    render() {
        var{data,cost} = this.state
        for(var i = 0; i < data.length; i++){
          cost += data[i].price * data[i].quantity
        }
        return (
            <div>
<div className = 'mainheader'>
            
      <Header/>
      </div>
      {data.map((item,i) => 
					<ShoppingCard   id = {item.id}
					 				className = 'item' 
					 				name = {item.name} 
					 				image = {item.image} 
					 				options = 'colors' 
					 				price = {item.price} 
					 				description = {item.description} 
					 				rating = {item.rating} 
					 				shipping = {item.shipping}
					 				quantity = {item.quantity}
					 				/>
					 			)
        	}
          <label> Total Cost: ${cost} </label>
          <button> Proceed to checkout </button>
            </div>
          
          
        
        );
    }
}

export default Cart;
