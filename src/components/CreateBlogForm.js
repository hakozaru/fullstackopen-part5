import React, { useState } from 'react'

const CreateBlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    handleCreate({ title, author, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          className='title-input'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          className='author-input'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Text"
          onChange={({ target }) => setUrl(target.value)}
          className='url-input'
        />
      </div>
      <button id='create-blog-btn' type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm
