import React, { Component } from 'react';
import './ShoppingCard.css'
import {Link} from 'react-router-dom'

function Categories(props){
		const cat = '/category/' + props.name
		return (
			<React.Fragment> 
			 	<span className = 'category' onClick = {() => document.location.replace(cat)}>{props.name}s</span>
			</React.Fragment>

		);
	}

export default Categories;
