const express = require('express')
const app = express()
const port = 3000

const { faker } = require('@faker-js/faker');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users/:items?', (req, res) => {

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

app.listen(port, () => {
  console.log(`Seed service listening on port ${port}`)
})
