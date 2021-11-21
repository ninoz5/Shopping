const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ninoz application." });
});
//Use items routes


app.get('/', (req,res) => {
  console.log(res)
})

const items = require('./app/routes/item.routes.js')(app)
const categories = require('./app/routes/category.routes.js')(app)
const users = require('./app/routes/user.routes.js')(app)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


