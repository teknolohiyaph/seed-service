const express = require("express");
const serverless = require("serverless-http");

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

// Faker.js
const { faker } = require('@faker-js/faker');

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get('/users/:items?', (req, res) => {

  let users = []

  let accessTypes = [
    'Employee',
    'Applicant'
  ]

  let randomAccessType = accessTypes[Math.floor(Math.random()*accessTypes.length)]

  maxItems = req.params.items || 200

  for (let index = 1; index <= maxItems; index++) {

    const firstName = faker.person.firstName()
    const middleName = faker.person.middleName()
    const lastName = faker.person.lastName()
    const birthday = faker.date.birthdate()
    const email = faker.internet.email()
    const accessType = randomAccessType

    let user = {}
    user.id = index
    user.firstName = firstName
    user.middleName = middleName
    user.lastName = lastName
    user.birthday = birthday
    user.email = email
    user.accessType = accessType

    users.push(user)
  }

  res.send(users)
})

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
