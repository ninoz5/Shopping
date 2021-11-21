module.exports = app => {
  const category = require("../controllers/category.controller.js");

  var router = require("express").Router();
  // Retrieve all items
  router.get("/",category.findAll);
  app.use('/category', router);
};