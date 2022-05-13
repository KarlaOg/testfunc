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
});

it('should create a new article', async () => {
  await FixtureLoader(await fs.realpath(__dirname + '/../fixtures/user.json'));

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

it('should return all articles with data', async () => {
  await FixtureLoader(
    await fs.realpath(__dirname + '/../fixtures/article.json')
  );
  const response = await client.get('/articles');
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(3);
});
it('should return a articles with data', async () => {
  await FixtureLoader(
    await fs.realpath(__dirname + '/../fixtures/article.json')
  );
  const response = await client.get(
    '/articles/' + ReferenceManager.getValue('article1.id')
  );
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(ReferenceManager.getValue('article1.id'));
  expect(response.body.title).toBe(ReferenceManager.getValue('article1.title'));
  expect(response.body.content).toBe(
    ReferenceManager.getValue('article1.content')
  );
  expect(response.body.author).toBe(
    ReferenceManager.getValue('article1.author')
  );
});
it('should return a articles with data', async () => {
  await FixtureLoader(
    await fs.realpath(__dirname + '/../fixtures/article.json')
  );
  const response = await client.get(
    '/articles/' + ReferenceManager.getValue('article2.id')
  );
  expect(response.status).toBe(200);
  expect(response.body.id).toBe(ReferenceManager.getValue('article2.id'));
  expect(response.body.title).toBe(ReferenceManager.getValue('article1.title'));
});
