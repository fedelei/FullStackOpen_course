import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ updateBlog, blog, removeBlog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleDetailsHandler = () => {
    setShowDetails(!showDetails)
  }




  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title} - {blog.author}{' '}
        <button onClick={toggleDetailsHandler}>
          {showDetails ? 'Hide' : 'View'}
        </button> 
      </div>
      {showDetails && (
        <div>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes} <button onClick={() => handleLike(blog.id)}>Like</button></p>
          <p>Added by: {blog.author}</p>
          <button onClick={() => removeBlog(blog.id)}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
