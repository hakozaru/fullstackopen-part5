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
          onChange={({ target }) => handleUsernameChange(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => handlePasswordChange(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
