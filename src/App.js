import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // 値の変更とフックの発火にラグがあって、正しい値で比較できていない
  // blogsが最新になるタイミングで都度sortかけないとダメっぽい
  // (永久ループとかにはならなかった)
  // useEffect(() => {
  //   setBlogs(sortBlogs(blogs))
  // }, [blogs])

  const sortBlogs = blogs => {
    return blogs.sort((a, b) => {
      if(a.likes > b.likes) return -1
      if(a.likes < b.likes) return 1
      return 0
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'bloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setMessage('ログインに成功しました')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('ログインに失敗しました')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setMessage('ログアウトしました')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleCreate = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      alert(exception)
    }
  }

  const updateBlogs = blog => {
    const newBlogs = blogs.map(b => {
      return b.id === blog.id ? blog : b
    })
    setBlogs(sortBlogs(newBlogs))
  }

  const deleteBlogs = blog => {
    const newBlogs = blogs.filter(b => {
      return b.id !== blog.id
    })
    setBlogs(newBlogs)
  }

  const blogList = () => {
    return(
      <div>
        <h2>blogs</h2>
        { message && <div>{`${message}`}</div> }
        <div>
          {user.username} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <h2>create new</h2>
        <div>
          <Togglable buttonLabel='new Blog' ref={blogFormRef}>
            <CreateBlogForm handleCreate={handleCreate}/>
          </Togglable>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} deleteBlogs={deleteBlogs} />
        )}
      </div>
    )
  }

  return(
    <>
      {
        user
          ? blogList()
          : <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={setUsername}
            handlePasswordChange={setPassword}
            message={message}
            errorMessage={errorMessage}
          />
      }
    </>
  )
}

export default App
