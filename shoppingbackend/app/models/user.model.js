module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: Sequelize.STRING
    },
     cart: {
      type: Sequelize.JSON
    },admin: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};
