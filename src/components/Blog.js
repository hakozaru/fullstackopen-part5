import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const buttonLabel = () => visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>{buttonLabel()}</button><br />
      {
        visible &&
        <>
          {blog.url}<br />
          {blog.likes}<button>like</button><br />
          {blog.author}<br />
        </>
      }
    </div>
  )
}

export default Blog
