const { AfterAll } = require('@cucumber/cucumber');
const { Sequelize } = require('sequelize/types');
const supertest = require('supertest');

const client = supertest(require("../app.js"));

AfterAll(async ()=>{
    await Sequelize.close();
})

describes('testArticle Api', ()=>{
    it("should return all articles",async ()=>{
        const response = await client.get("/articles")
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    })
})

it("should create a new article", async ()=> {
    const response = await client.post("/articles")
    .set("Content-Type","application/json")
    .send({
        title:"je suis le titre",
        content:"joadazopakpoezkep",
        author:1,
    });
    expect(response.status).toBe(201);
    expect(response.title).toBe("je suis le titre");
    expect(response.body).toHaveProperty("id");
    expect(response.content).toBe("joadazopakpoezkep");
    expect(response.author).toBe(1);

})