import React from 'react'
import { useState } from 'react'


const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>

      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
         Title: <input placeholder='Title' type="text" value={title} onChange={(event) => setTitle(event.target.value)}/> <br />
         Author: <input placeholder='Author' type="text" value={author} onChange={(event) => setAuthor(event.target.value)} /> <br />
         URL: <input placeholder='URL' type="text" value={url} onChange={(event) => setUrl(event.target.value)}/> <br />
          <button type="submit">Create</button>
        </div>
      </form>

    </>
  )
}
export default AddBlog