module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.BLOB('long')
    },
     stock: {
      type: Sequelize.INTEGER 
    },
     price: {
      type: Sequelize.DOUBLE
    },
     rating: {
      type: Sequelize.DOUBLE
    },
     category: {
      type: Sequelize.STRING
    },
  });

  return Item;
};