const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");
const { expect } = require("expect");
const supertest = require("supertest");
const ReferenceManager = require("../fixtures/ReferenceManager");
const { sequelize } = require("../models");
const client = supertest(require("../app.js"));

function interpolateString(str) {
  return str.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, name) => {
    return ReferenceManager.getValue(name);
  });
}
function interpolate(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = interpolateString(obj[key]);
    }
    if (typeof obj[key] === "object") {
      obj[key] = interpolate(obj[key]);
    }
  }
  return obj;
}

AfterAll(async () => {
  await sequelize.close();
});

Given("I have a payload", function (dataTable) {
  this.payload = interpolate(dataTable.rowsHash());
});

// Given("I am authenticated as {string}", async function (string) {
//   const user = ReferenceManager.getReference(string);
//   const login = await client
//     .post('/users/login')
//     .set('Content-Type', 'application/json')
//     .send({
//       email: 'jane5@test.com',
//       password: 'password',
//     });
//   // user => token
//   this.token = login.body.token;
// });

// Given("There is a user {string} and {string}", async function (string ) {
// Write code here that turns the phrase above into concrete actions
//   const user = ReferenceManager.getReference(string);
//   const login = await client
//   .post('/users/login')
//   .set('Content-Type', 'application/json')
//   .send({
//     email: {email},
//     password: {password},
//   }); 
//   return login.response.status;
// });

Given('There is a user {string} and {string}', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions 
  this.email = ReferenceManager.getReference(string);
  this.password = ReferenceManager.getReference(string2);

});

When('I login to {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  this.route = ReferenceManager.getReference(string);
});

When('Send a POST HTTP request', async function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  dataTable
});


When("I request {string} {string}", async function (method, path) {
  this.request = client[method.toLowerCase()](interpolateString(path));
  this.response = await this.request.send();
  // Write code here that turns the phrase above into concrete actions
});

When("I request {string} {string} with payload", async function (method, path) {
  this.request = client[method.toLowerCase()](interpolateString(path)).set(
    "Content-Type",
    "application/json"
  );
  this.response = await this.request.send(this.payload);
});

Then("the response code should be {int}", function (int) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.status).toBe(int);
});

Then("I should receive an empty array", function () {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body.length).toBe(0);
});

Then("I should receive an array", function () {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body.length).toBe(22);
});

Then("I should receive an array with {int} elements", function (int) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body.length).toBe(int);
});

Then("I should have a property {string}", function (string) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.body).toHaveProperty(string);
});

Then(
  "I should receive an element with the following attributes",
  function (dataTable) {
    const expected = interpolate(dataTable.rowsHash());
    const actual = this.response.body;
    expect(typeof actual).toBe("object");
    Object.keys(expected).forEach((key) => {
      expect(actual).toHaveProperty(key, expected[key]);
    });
  }
);