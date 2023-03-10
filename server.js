const express = require("express");
const cors = require("cors");

const app = express();


const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "ops"
  });

  Role.create({
    id: 2,
    name: "inf"
  });

  Role.create({
    id: 3,
    name: "devops"
  });
}


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kambal dashboard." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
