import React, { Component } from 'react';
import './ShoppingCard.css'
import {Link} from 'react-router-dom'
import shirt1 from '../static/shirt1.jfif'
function ShoppingCard(props){
		var stock;
		if(props.stock !== 0){
			stock = 'Stock: ' + props.stock
		}else{
			stock = 'Out of stock!'
		}
		return (
			<Link className  = 'shoppingitem' to = {'/items/id/' + props.id}>
				<div className  = 'upper'>
				<img className = 'itemimage' src = {`data:image/jpeg;base64,${props.image}`} />
				<div className = 'options'>
				<label className = 'option'> {props.name} </label>
				</div>
				</div>
				<div className = 'details'>
				<label className = 'description'> {props.description} </label><br />
				<label className = 'price'> ${props.price}/{props.number} piece </label>
				<label className = 'shipping'> {props.shipping} shipping </label>
				<label className = 'rating'> {props.rating} </label> <br/>
				<label className = 'rating'> {stock}  </label>
 				</div>
			</Link >

		);
	}

export default ShoppingCard;
