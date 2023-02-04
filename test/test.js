const app = require('../index');
const request = require('supertest');
const mongoose = require('mongoose');

beforeEach((done) => {
    mongoose.connect("mongodb+srv://muhire:123@cluster0.uhegkvl.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });

  describe("Test the /posts endpoint", () => {
    test("It should create a new post", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ title: "history", description: "this is my first description", imageUrl: "https://images.app.goo.gl/zviQwVrTb8SfUSn89" });
      expect(response.status).toBe(200);
      expect(response.body.message).toContain("Blog has been successfully created");
    });
  });
  describe("Test the /signup endpoint", () => {
    test("It should create a new user", async () => {
        const data = { email: "bugingo12@gmail.com", password: "tester1" };
      const response = await request(app)
        .post("/signup")
        .send(data);
      expect(response.status).toBe(201);
      expect(response.body).toContain("Blog has been successfully created");
    });
  });
describe('GET /users', () => {
  it('should return a 200 response', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
  });
});


