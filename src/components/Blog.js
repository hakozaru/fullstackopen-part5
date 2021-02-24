import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs }) => {
  const [visible, setVisible] = useState(false)

  const buttonLabel = () => visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const voteLike = (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    blogService.updateBlog(newBlog)
    updateBlogs(newBlog)
  }

  return(
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>{buttonLabel()}</button><br />
      {
        visible &&
        <>
          {blog.url}<br />
          {blog.likes}<button onClick={() => voteLike(blog)}>like</button><br />
          {blog.author}<br />
        </>
      }
    </div>
  )
}

export default Blog
