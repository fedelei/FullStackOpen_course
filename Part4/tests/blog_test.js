const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Tu aplicación principal
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper'); // Opcional: crea un archivo con funciones de utilidad
const api = supertest(app);

let token; // Aquí almacenaremos el token para las pruebas

beforeAll(async () => {
  await User.deleteMany({});
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123',
  };

  // Crea un nuevo usuario y obtiene el token
  await api.post('/api/users').send(newUser);
  const loginResponse = await api.post('/api/login').send({
    username: newUser.username,
    password: newUser.password,
  });

  token = loginResponse.body.token; // Guarda el token para pruebas
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const initialBlogs = helper.initialBlogs; // Blogs de prueba iniciales si los tienes
  await Blog.insertMany(initialBlogs);
});

describe('adding blogs', () => {
  test('successfully adds a blog with a valid token', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb(); // Función opcional para obtener blogs
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).toContain(newBlog.title);
  });

  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 5,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('Token inválido o faltante');

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
