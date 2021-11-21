import React, { useState } from 'react';
import ShoppingCard from './ShoppingCard'
import {Link} from 'react-router-dom'
import ItemDetails from './ItemDetails'
import Header from'./Header'
import Categories from './Categories'
import './Home.css'
import AvailableItems from './AvailableItems'
import { useParams } from 'react-router-dom'


function Home(props){
        const  cat = useParams().cat || ''
       
        return (
          
            <div className = 'Home'>
            
               <div className = 'mainheader'>
            
      <Header/>
      </div>
      <div >
        <Categories/>

        </div> 
            <AvailableItems cat = {cat}/>
            
            </div>
           

        );
    }

export default Home;
