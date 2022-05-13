const supertest = require("supertest");
const { sequelize } = require("../models/index.js");
const fs = require("fs/promises");
const FixtureLoader = require("../fixtures/FixtureLoader.js");
const ReferenceManager = require("../fixtures/ReferenceManager.js");

const client = supertest(require("../app.js"));

beforeEach(async () => {
  sequelize.constructor._cls = new Map();
  sequelize.constructor._cls.set("transaction", await sequelize.transaction());
});

afterEach(async () => {
  await sequelize.constructor._cls.get("transaction").rollback();
  sequelize.constructor._cls.delete("transaction");
});

afterAll(async () => {
  await sequelize.close();
});

describe("test article Api", () => {
  it("should return all articles", async () => {
    const response = await client.get("/articles");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("should create a new article", async () => {
    const response = await client
      .post("/articles")
      .set("Content-Type", "application/json")
      .send({
        title: "Test article scénario",
        content: "eozakopezkzaoe",
        author: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test article");
    expect(response.body.content).toBe("eozakopezkzaoe");
    expect(response.body.author).toBe(1);
  });
  it("should return all articles with data", async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + "/../fixtures/article.json")
    );
    const response = await client.get("/articles");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
  it("should return a articles with data", async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + "/../fixtures/article.json")
    );
    const response = await client.get(
      "/articles/" + ReferenceManager.getValue("article1.id")
    );
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(ReferenceManager.getValue("article1.id"));
    expect(response.body.title).toBe(ReferenceManager.getValue("article1.title"));
    expect(response.body.content).toBe(ReferenceManager.getValue("article1.content"));
    expect(response.body.author).toBe(ReferenceManager.getValue("article1.author"));
  });
  it("should return a articles with data", async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + "/../fixtures/article.json")
    );
    const response = await client.get(
      "/articles/" + ReferenceManager.getValue("article2.id")
    );
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(ReferenceManager.getValue("article2.id"));
    expect(response.body.name).toBe(ReferenceManager.getValue("article1.name"));
  });
});