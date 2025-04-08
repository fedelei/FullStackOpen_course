const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const authorization = request.get('authorization')
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const token = authorization.substring(7)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blogs = await Blog.find({ user: user._id })
  response.json(blogs)
})

  blogRouter.post('/', async (request, response) => {
    try {
    const user = request.user
    const body = request.body
    

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

   const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
   await user.save()
   response.status(201).json(savedBlog)
  } catch(error){
    next(error)
  }
  })

  blogRouter.delete('/:id', async (request, response, next) => {
    try {
      
      console.log("Token extraido: ", request.token);
      const user = request.user;

      const blog = await Blog.findById(request.params.id);
  
      // Si el blog no existe
      if (!blog) {
        return response.status(404).json({ error: 'El blog no existe' });
      }
  
      // Compara el ID del usuario del token con el creador del blog
      if (blog.user.toString() !==  user._id.toString()) {
        return response.status(401).json({
          error: 'No autorizado para eliminar este blog',
        });
      }
  
      // Elimina el blog
      await Blog.findByIdAndDelete(request.params.id);
  
      response.status(204).end();
    } catch (error) {
      next(error); // Maneja errores con el middleware de errores
    }
  });
  


// Actualizar likes de un blog por su ID
blogRouter.put('/:id', async (req, res) => {
  
    const { id } = req.params;
    const { likes } = req.body;

    if (likes === undefined) {
      return res.status(400).json({ error: 'El campo "likes" es obligatorio' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    );

    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ error: 'Publicación no encontrada' });
    }
  
});


  
  module.exports = blogRouter; 