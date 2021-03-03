import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  message,
  errorMessage
}) => {
  return(
    <form onSubmit={handleLogin}>
      { message && <div>{`${message}`}</div> }
      { errorMessage && <div>{`${errorMessage}`}</div> }
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id='username'
          onChange={({ target }) => handleUsernameChange(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id='password'
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
      </div>
      <button type="submit" id='login-btn'>login</button>
    </form>
  )
}

export default LoginForm
