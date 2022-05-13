const FixtureLoader = require("../fixtures/FixtureLoader");
const { Given } = require("@cucumber/cucumber");
const fs = require("fs/promises");

Given("I load fixtures {string}", async function (string) {
  const paths = string.split(",");
  for (let index in paths) {
    paths[index] = await fs.realpath(
      __dirname + "/../fixtures/" + paths[index]
    );
  }
  await FixtureLoader(...paths);
});