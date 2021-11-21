const express = require ('express')
const app = express()
const { Sequelize, DataTypes, Model } = require('sequelize');
const mysql  =require('mysql2')


const sequelize = new Sequelize('test2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

async function auth(sequelize){
	try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
auth(sequelize)
const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
});



const Item = sequelize.define('Item', {
		name: {
			type: DataTypes.STRING,
		},
  // Model attributes are defined here
  imagepath: {
    type: DataTypes.STRING,
   
  },
  description: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  rating: {
    type: DataTypes.DOUBLE,
    // allowNull defaults to true
  },
  category: {
  	type: DataTypes.STRING
  }
  
});


async function buildtables(){
	await sequelize.sync();
		console.log("All models were synchronized successfully.");
}
buildtables()
//table drop docs
// await User.drop();
// console.log("User table dropped!");


// await sequelize.drop();
// console.log("All tables dropped!");

const shirt1 = Item.build({ imagepath: "/static/shirt1.jfif",
	name: "Shirt 1",
	description: "This is the first and coolest shirt on Anis Express",
	price: "50",
	rating: 0.7,
	category: 'top'
	 });
shirt1.save()
console.log(shirt1 instanceof Item); // true
console.log(''); // "Jane"

module.exports = Item