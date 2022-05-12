const { sequelize } = require("../models/index.js");
const supertest = require('supertest');

const client = supertest(require("../app.js"));

beforeEach(async ()=>{
    sequelize.constructor._cls = new Map();
    sequelize.constructor._cls.set("transaction", await sequelize.transaction())
})

afterEach(async() =>{
    await sequelize.constructor._cls.get("transaction").rollback()
    await sequelize.constructor._cls.delete("transaction")
});

afterAll(async () => {
await sequelize.close();
      });

describe('testArticle Api', ()=>{
    it("should return all articles",async ()=>{
        const response = await client.get("/articles")
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    })
})

    it("should create a new article", async ()=> {
        const response = await client
        .post("/articles")
        .set("Content-Type","application/json")
        .send({
            title:"titre 2",
            content:"joadazopakpoezkep",
            author:1,
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("titre 2");
    expect(response.body).toHaveProperty("id");
    expect(response.body.content).toBe("joadazopakpoezkep");
    expect(response.body.author).toBe(1);

})