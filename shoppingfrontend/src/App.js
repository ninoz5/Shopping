import React, { Component } from 'react';
import Home from './components/Home'
import './App.css';
import {Route} from 'react-router-dom'
import ItemDetails from './components/ItemDetails'
import Cart from './components/Cart'
import Login from './components/Login'
import Admin from './components/Admin'
import AddItem from './components/AddItem'
class App extends Component{
 
constructor(props){
    super(props)
    this.state= {data:null}

    
  }
  
  render(){

  return (

    <div className="App">

        <Route exact path = '/' component = {Home}/>
         <Route exact path = '/items/id/:id' component = {ItemDetails}/>
        <Route exact path = '/category/:cat' component = {Home}/>
        <Route exact path = '/user/id/:id/cart' component = {Cart}/>
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/admin' component = {Admin} />
        <Route exact path = '/admin/additem' component = {AddItem} />

          </div>
  );
}
}

export default App;
