import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogs, deleteBlogs }) => {
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

  const removeBlog = async blog => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      deleteBlogs(blog)
    }
  }

  return(
    <div style={blogStyle}>
      {blog.title}
      <button className='test-btn' onClick={() => setVisible(!visible)}>{buttonLabel()}</button><br />
      {
        visible &&
        <>
          {blog.url}<br />
          {blog.likes}<button className='likes-btn' onClick={() => voteLike(blog)}>like</button><br />
          {blog.author}<br />
          <button onClick={() => removeBlog(blog)}>remove</button><br />
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  deleteBlogs: PropTypes.func.isRequired
}

export default Blog
