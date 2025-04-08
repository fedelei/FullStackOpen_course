import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef() // Creamos la referencia

  useEffect(() => {
    // Recuperar usuario desde localStorage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      fetchBlogs(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token) // Configurar el token después de iniciar sesión
      fetchBlogs(user.token)
      setMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Username or password incorrect')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    // Eliminar usuario de localStorage y resetear estado
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogs([])
  }

  const fetchBlogs = async (token) => {
    try {
      const response = await axios.get('http://localhost:3001/api/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBlogs(response.data)
    } catch (error) {
      setErrorMessage('Error fetching blogs')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility() // Ocultar el formulario
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setMessage(`A new blog ${newBlog.title} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Error adding blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const removeBlog = async (id) => {
    try {
      if(window.confirm('Are you sure you want to remove this blog?')) {

        await blogService.remove(id)

        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage('Blog removed successfully')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (error) {
      setErrorMessage('Error removing blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  if (!user) {
    return (
      <>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Togglable buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
          />
        </Togglable>
      </>
    )
  }
  const handleLike = async (id) => {
    try {
      const blogToLike = blogs.find(blog => blog.id === id)
      if (!blogToLike) {
        throw new Error('Blog not found')
      }
      const updatedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1
      }
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  return (
    <div>
      <h2>Blogs by {user.name}</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
      {blogs
        .sort(((a, b) => b.likes - a.likes))
        .map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} handleLike={handleLike}/>
        ))}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <AddBlog createBlog={createBlog} />
      </Togglable>
    </div>
  )
}


export default App
