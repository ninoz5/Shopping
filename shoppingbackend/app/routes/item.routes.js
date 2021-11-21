module.exports = app => {
  const items = require("../controllers/item.controller.js");

  var router = require("express").Router();

  // // Create a new Tutorial
   router.post("/additem", items.create);

  // Retrieve all items
  router.get("/",items.findAll);
 
  router.get('/cat/:category', items.findByCat)
  // Retrieve a single Tutorial with id
  router.get("/id/:id", items.findOne);

  // Update a Tutorial with id
  router.put("/update/:id", items.update);

  // Delete a Tutorial with id
  router.delete("/delete/:id", items.delete);

  // Delete all items
  router.delete("delete/", items.deleteAll);
  app.use('/items', router);

};