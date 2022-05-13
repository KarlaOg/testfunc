const { sequelize } = require('../models/index.js');
const supertest = require('supertest');
const client = supertest(require('../app.js'));
const fs = require('fs/promises');
const FixtureLoader = require('../fixtures/FixtureLoader');
const ReferenceManager = require('../fixtures/ReferenceManager.js');

beforeEach(async () => {
  sequelize.constructor._cls = new Map();
  sequelize.constructor._cls.set('transaction', await sequelize.transaction());
});

afterEach(async () => {
  await sequelize.constructor._cls.get('transaction').rollback();
  await sequelize.constructor._cls.delete('transaction');
});

afterAll(async () => {
  await sequelize.close();
});

describe('testArticle Api', () => {
  //GET
  it('should return all articles', async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + '/../fixtures/article.json')
    );
    const response = await client.get('/articles');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
  it('should return an array if there are no articles', async () => {
    const response = await client.get('/articles');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  //GET BY ID
  it('should return the first article', async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + '/../fixtures/article.json')
    );
    const response = await client.get(
      '/articles/' + ReferenceManager.getValue('article1.id')
    );
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(
      ReferenceManager.getValue('article1.title')
    );
    expect(response.body.content).toBe(
      ReferenceManager.getValue('article1.content')
    );
  });

  it('should not return the first article', async () => {
    const response = await client.get('/articles/1');
    expect(response.status).toBe(404);
    // expect(response.body).toBeEmpty();
  });

  //POST
  it('should create a new article', async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + '/../fixtures/user.json')
    );

    const login = await client
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@gmail.com',
        password: 'test',
      });
    const response = await client
      .post('/articles')
      .set('Content-Type', 'application/json')
      .set('x-access-token', login.body.token)
      .send({
        title: 'titre 2',
        content: 'joadazopakpoezkep',
        author: 'toto',
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('titre 2');
    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toBe('joadazopakpoezkep');
    expect(response.body.author).toBe('toto');
  });

  it('should create a new article with no data', async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + '/../fixtures/user.json')
    );

    const login = await client
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@gmail.com',
        password: 'test',
      });
    const response = await client
      .post('/articles')
      .set('Content-Type', 'application/json')
      .set('x-access-token', login.body.token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      author: 'Article.author cannot be null',
      content: 'Article.content cannot be null',
      title: 'Article.title cannot be null',
    });
  });

  it('should update a article', async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + '/../fixtures/user.json'),
      await fs.realpath(__dirname + '/../fixtures/article.json')
    );

    const login = await client
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@gmail.com',
        password: 'test',
      });

    const response = await client
      .put('/articles/' + ReferenceManager.getValue('article1.id'))
      .set('Content-Type', 'application/json')
      .set('x-access-token', login.body.token)
      .send({
        title: 'titre 2',
        content: 'joadazopakpoezkep',
        author: 'toto',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('titre 2');
    expect(response.body.content).toBe('joadazopakpoezkep');
  });

  it('should update a article with no data', async () => {
    await FixtureLoader(
      await fs.realpath(__dirname + '/../fixtures/user.json'),
      await fs.realpath(__dirname + '/../fixtures/article.json')
    );

    const login = await client
      .post('/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'user@gmail.com',
        password: 'test',
      });

    const response = await client
      .put('/articles/' + ReferenceManager.getValue('article1.id'))
      .set('Content-Type', 'application/json')
      .set('x-access-token', login.body.token)
      .send({ title: null });
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      title: 'Article.title cannot be null',
    });
  });
});
