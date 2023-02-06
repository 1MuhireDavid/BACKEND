const request = require('supertest');
const app = require('../index.test'); // import your express app
const mongoose = require('mongoose');
const mongod = require('mongodb-memory-server').MongoMemoryServer;
let server;
let mongodb;
var blogId;
var userId, token

beforeAll(async () => {
  mongodb = await mongod.create();
  const uri = mongodb.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true });
});
beforeEach(() => {
    const port = Math.floor(Math.random() * 1000) + 3000;
    server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  });
  
afterAll(async () => {
  await mongoose.disconnect();
  await mongodb.stop();
});

describe('GET /posts', () => {
    it('should return an object of data', async () => {
      const res = await request(app).get('/posts');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
  });
describe('GET /', () => {
    it('should return this is homepage', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
 //     expect(res.body).toContain("this  is homepage");
    });
  });
describe('POST /posts', () => {
    it('should create new blog', async () => {
        const data = {
            title: "this is my title",
            description: "this is my description",
            imageUrl: "https://images.app.goo.gl/RcKPUqAwU6XC944Y7"
        }
      const res = await request(app).post('/posts').send(data);
      blogId = res.body.blog._id
      expect(res.statusCode).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.blog).toHaveProperty('title','this is my title');
    });
  });
describe('PUT /posts/:id', () => {
    it('should update an existing data', async () => {
        const data = {
            title: "this is my updated title",
            description: "this is updated my description",
            imageUrl: "https://images.app.goo.gl/RcKPUqAwU6XC944Y7/updated"
        }
      const res = await request(app).put(`/posts/${blogId}`).send(data);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('title','this is my updated title');
    });
  });
describe('GET /posts/:id', () => {
    it('should return a single blog', async () => {
      const res = await request(app).get(`/posts/${blogId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe()
      expect(res.body).toBeInstanceOf(Object);
    });
  });


  //  ***************************** user test 
describe('users', () => {
  beforeAll(async () => {
    describe('POST /signup', () => {
      it('should create new user', async () => {
          const data = {
              email: "user@hotmail.com",
              password: "test12345"
          }
        const res = await request(app).post('/signup').send(data);
        userId = res.body.user._id
        expect(res.statusCode).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        //expect(res.body.blog).toHaveProperty('title','this is my title');
      });
    });
  });
  describe('GET /users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
  });
  describe('PUT /users/:id', () => {
    it('should update an existing data', async () => {
        const data = {
            email: "user@hotmail.com",
            password: "test123456"
        }
      const res = await request(app).put(`/users/${userId}`).send(data);
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      //expect(res.body).toHaveProperty('title','this is my updated title');
    });
  });
  describe('GET /users/:id', () => {
    it('should return a single user', async () => {
      const res = await request(app).get(`/users/${userId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe()
      expect(res.body).toBeInstanceOf(Object);
    });
  });
  describe('DELETE /users/:id', () => {
    beforeAll(async () => {
      // First, log in to get an authentication token
      const res = await request(app)
        .post('/signin')
        .send({ email: "user@hotmail.com", password: 'test123456' });
  
      token = res.body.token;
    });
  
    it('should delete an existing resource', async () => {
      const res = await request(app)
        .delete(`/users/${userId}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Resource successfully deleted');
    });
  });
  
  describe('POST /signin', () => {
    it('should signin', async () => {
        const data = {
            email: "user@hotmail.com",
            password: "test123456"
        }
      const res = await request(app).post('/signin').send(data);
       token = res.body.token;
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
  });


  });
// describe('POST /signup', () => {
//   it('should create new user', async () => {
//       const data = {
//           email: "user@hotmail.com",
//           password: "test12345"
//       }
//     const res = await request(app).post('/signup').send(data);
//     userId = res.body.user._id
//     expect(res.statusCode).toBe(201);
//     expect(res.body).toBeInstanceOf(Object);
//     //expect(res.body.blog).toHaveProperty('title','this is my title');
//   });
// });































//   describe('DELETE /posts/:id', () => {
//     let token;
  
//     beforeAll(async () => {
//       // First, log in to get an authentication token
//       const res = await request(app)
//         .post('/signin')
//         .send({ email: 'muhiredavid74@gmail.com', password: 'test123' });
  
//       token = res.body.token;
//     });
  
//     it('should delete an existing resource', async () => {
//       const res = await request(app)
//         .delete('/api/endpoint/123')
//         .set('Authorization', `Bearer ${token}`);
  
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('message', 'Resource successfully deleted');
//     });
//   });

//   //  ***************************** auth test

//   describe('Authentication Middleware', () => {
//     it('should return 401 Unauthorized if no token is provided', async () => {
//       const res = await request(app)
//         .delete(`/posts/123`);
  
//       expect(res.statusCode).toBe(401);
//       expect(res.body).toHaveProperty('error', 'No token provided');
//     });
  
//     it('should return 404 Forbidden if the token is invalid', async () => {
//       const res = await request(app)
//         .delete('/posts/123')
//         .set('Authorization', 'Bearer invalid_token');
  
//       expect(res.statusCode).toBe(404);
//       expect(res.body).toHaveProperty('message', 'Invalid token');
//     });
//   });
  
// // *************************************** Contact us test
// var messageId;
//   describe('GET /contactUs', () => {
//     it('should return an object of data', async () => {
//       const res = await request(app).get('/contactUs');
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toBeInstanceOf(Object);
//     });
//   });
// describe('POST /contactUs', () => {
//     it('should create new message', async () => {
//         const data = {
//             name: "user1",
//             title: "user@hotmail.com",
//             description: "test12345"
//         }
//       const res = await request(app).post('/signup').send(data);
//       messageId = res.body.blog._id
//       expect(res.statusCode).toBe(201);
//       expect(res.body).toBeInstanceOf(Object);
//       //expect(res.body).toHaveProperty('title','this is my title');
//     });
//   });
// // describe('PUT /contactUs/:id', () => {
// //     it('should update an existing data', async () => {
// //         const data = {
// //             username: "user",
// //             dob: "20/08/2004",
// //             email: "user@hotmail.com",
// //             password: "test"
// //         }
// //       const res = await request(app).put(`/posts/${blogId}`).send(data);
// //       expect(res.statusCode).toBe(200);
// //       expect(res.body).toBeInstanceOf(Object);
// //       expect(res.body).toHaveProperty('title','this is my updated title');
// //     });
// //   });
// describe('GET /contactUs/:id', () => {
//     it('should return a single user', async () => {
//       const res = await request(app).get(`/contactUs/${userId}`);
//       expect(res.statusCode).toBe(200);
//       expect(res.body._id).toBe()
//       expect(res.body).toBeInstanceOf(Object);
//     });
//   });
//   describe('DELETE /contactUs/:id', () => {
//     // beforeAll(async () => {
//     //   // First, log in to get an authentication token
//     //   const res = await request(app)
//     //     .post('/signin')
//     //     .send({ email: 'muhire@yahoo.com', password: 'test123' });
  
//     //   token = res.body.token;
//     // });
  
//     it('should delete an existing resource', async () => {
//       const res = await request(app)
//         .delete(`/contactUs/${messageId}`);
  
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('message', 'Resource successfully deleted');
//     });
//   });

//  // commment auth

//       // it('should return 200 OK if the token is valid', async () => {
//     //   // First, log in to get an authentication token
//     //   const loginRes = await request(app)
//     //     .post('/signin')
//     //     .send({ email: 'user@hotmail.com', password: 'test12345' });
  
//     //   const token = loginRes.body.token;
  
//     //   const res = await request(app)
//     //     .delete('/posts')
//     //     .set('Authorization', `Bearer ${token}`);
  
//     //   expect(res.statusCode).toBe(200);
//     //   //expect(res.body).toHaveProperty('message', 'Protected endpoint');
//     // });

