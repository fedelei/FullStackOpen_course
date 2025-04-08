const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'the money',
        author: true,
        url: 'www.meney.com',
        likes: 5
    },
    {
        title: 'the figth',
        author: true,
        url: 'www.figth.com',
        likes: 1
    },
  ]


const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}