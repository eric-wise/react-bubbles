import React, { useState }  from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  const [creds, setCreds] = useState({
    username: '',
    password: ''
})

const changeHandler = e => {
  setCreds({
    ...creds,
    [e.target.name]: e.target.value
  })
}

const submitHandler = e => {
  e.preventDefault();
  setCreds({ username: '', password: '' })

axiosWithAuth()
  .post('/login', creds)
  .then(res => {
    localStorage.setItem('token', res.data.payload)
    props.history.push('/bubble-page')
  })
  .catch(err => console.log(err))
}

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          value={creds.username}
          onChange={changeHandler}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          name='password'
          value={creds.password}
          onChange={changeHandler}
        />
        <button type='submit'>Login</button>
      </form>   
    </div>   
  )
}

export default Login;