const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;
var imageToBlob = require( 'image-to-blob' )

// Create and Save a new Item
exports.create = (req, res) => {

  // Create a Item
  const item= {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    stock: req.body.stock,
    price: req.body.price,
    category: req.body.category
  };

  // Save Item in the database
  Item.create(item)
    .then(data => {
      console.log(req.body)
      res.send(req.data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Item."
      });
    });
};

// Retrieve all items from the database.
exports.findByCat = (req, res) => {
 const category = req.params.category
  
  Item.findAll({
    where:{
      category:category
    }
  })
    .then(data => {
      to64(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};
exports.findAll = (req, res) => {
 
  Item.findAll()
    .then(data => {
      to64(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
   const id = req.params.id;

  Item.findByPk(id)
    .then(data => {
      if (data) {
        data.image = data.image.toString('base64')
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Item with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Item with id=" + id
      });
    });
};
// Update a Item by the id in the request
exports.update = (req, res) => {
   const id = req.params.id;

  Item.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;

  Item.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id
      });
    });
};

// Delete all items from the database.
exports.deleteAll = (req, res) => {
   Item.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} items were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all items."
      });
    });
};

// Find all published items
// exports.findAllPublished = (req, res) => {
//   utorial.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving items."
//       });
//     });
// };
function to64(data){
   for(var i = 0; i < data.length; i++){
        if(data[i].image !== null)
        data[i].image = data[i].image.toString('base64')
      }
}