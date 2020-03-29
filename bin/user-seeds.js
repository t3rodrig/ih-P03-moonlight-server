// Seeds file that remove all users and create new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(process.env.DUMMY_PASS, salt);

mongoose
  .connect(process.env.URL_DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

let users = [
  {
    firstName: "Ana",
    paternalLastName: "Martínez",
    email: "ana@example.com",
    password: hashPass
  },
  {
    firstName: "Andrea",
    paternalLastName: "López",
    email: "andrea@example.com",
    password: hashPass
  },
  {
    firstName: "Alejandra",
    paternalLastName: "Sánchez",
    email: "alejandra@example.com",
    password: hashPass
  },
  {
    firstName: "Karla",
    paternalLastName: "Flores",
    email: "karla@example.com",
    password: hashPass
  }
];

User.deleteMany()
.then(() => {
  return User.create(users);
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect();
})
.catch(err => {
  mongoose.disconnect();
  throw err;
});