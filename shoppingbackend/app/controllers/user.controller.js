const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);


// exports.create = (req, res) => {
//   // Validate request
//   // if (!req.body.title) {
//   //   res.status(400).send({
//   //     message: "Content can not be empty!"
//   //   });
//   //   return;
//   // }

//   // Create a User
//   const User= {
//     name: req.body.name,
//     description: req.body.description,
//     imagepath: req.body.imagepath,
//     stock: req.body.stock,
//     price: req.body.price,
//     rating: req.body.rating,
//     User: req.body.User
//   };

//   // Save User in the database
//   User.create(User)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     });
// };

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  // const title = req.body.title
 // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // User.findAll({ where: condition })
  User.findAll()
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
   const id = req.params.id;


  User.findByPk(id)
    .then(data => {
      if (data) {
          
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};
exports.addToCart = (req, res) => {
    const id = req.params.id;
    const itemid = req.body.id

  User.findByPk(id)
    .then(data => {
      if (data) {
          var cart = JSON.parse(data.cart) || {}
          
         if(itemid in cart){
           cart[itemid] += 1
         }else{
           cart[itemid] = 1
         }

        data.cart = cart
        User.update({ cart: cart}, {
  where: {
    id: id
  }
});
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    

    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

exports.login = (req, res) => {
   const username = req.body.username;
   const password = req.body.password;


  User.findAll({
    where:{
      username:username,
      password:password
    }
  })
    .then(data => {

      if (data.length === 1) {
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" 
      });
    });
};
// Update a User by the id in the request
// exports.update = (req, res) => {
//    const id = req.params.id;

//   User.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id
//       });
//     });
// };

// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//    const id = req.params.id;

//   User.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id
//       });
//     });
// };

