const {test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const assert = require('assert'); 
const app = require('../app')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })
  

test('blog retorna un json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
after(async () => {
    await mongoose.connection.close()
  })

  test('return 2 blogs ', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })

  test.only('la propiedad de identificador único se llama id', async () => {

    // Realizar la solicitud GET
    const response = await api.get('/api/blogs');
  
    // Verificar que cada objeto tenga una propiedad 'id' y no '_id'
    response.body.forEach(blog => {
      assert(blog.id, 'La propiedad id no está definida');
      assert(!blog._id, 'La propiedad _id no debería estar presente');
    });
  });
  
  after(async () => {
    await mongoose.connection.close();
  });


  test('a valid blog can be added ', async () => {
    const newBLog = {
      title: 'the fitness',
      author: true,
      url: 'www.fede.com',
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBLog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  
    assert(title.includes('the fitness'))
  })


test('likes default 0', async () => {
  // Crear un blog sin la propiedad 'likes'
  const newBlog = {
    title: 'Blog sin likes',
    author: 'Autor desconocido',
    url: 'Contenido de prueba',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201) // Código de éxito para creación
    .expect('Content-Type', /application\/json/);

  // Verificar que el valor de 'likes' sea 0
  const createdBlog = response.body;
  assert.strictEqual(createdBlog.likes, 0, 'El valor de likes debería ser 0');
});

after(async () => {
  await mongoose.connection.close();
});

test.only('si faltan title o url, responde con 400 Bad Request', async () => {
    // Blog sin la propiedad title
    const blogWithoutTitle = {
      url: 'www.fedelei.com',
      author: 'Fedelei',
      likes: 4,
    };
  
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  
    // Blog sin la propiedad URL'
    const blogWithoutUrl = {
      title: 'Batman',
      author: 'fedelei',
        likes: 3,
    };
  
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  
  after(async () => {
    await mongoose.connection.close();
  });


  describe('deletion of a blog', () => {
      test('succeeds with status code 204 if id is valid', async ()=> {
        const blogAtStart = await helper.blogsInDb()
        const blogToDelete = blogAtStart[0]
    
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        const blogAtEnd = await helper.blogsInDb()
    
        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1)
    
        const title = blogAtEnd.map(r => r.title)
        assert(!title.includes(blogToDelete.title))
      })
      after(async () => {
        await mongoose.connection.close()
      })
  })


  
  test.only('actualiza los likes de un blog existente', async () => {
    // Crear un blog para la prueba
    const newBlog = new Blog({
      title: 'Blog de prueba',
      author: 'Autor de prueba',
      url: 'http://example.com',
      likes: 10,
    });
    await api
      .put(`/api/blogs/${newBlog._id}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
  
  after(async () => {
    await mongoose.connection.close();
  });


// TEST USERS

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})