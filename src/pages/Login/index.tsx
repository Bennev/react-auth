import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import "./style.css"

const Login = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    // const response = await fetch('http://localhost:8000/api/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     email,
    //     password
    //   })
    // })

    const response = await axios({
      url: 'http://localhost:8000/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.data)

    setRedirect(true)
  }

  if(redirect) {
    return <Navigate to="/home" />
  }

  return (
    <form className="form-signin" onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

      <input type="email" className="form-control" placeholder="Email Address" required 
        onChange={e => setEmail(e.target.value)}
      />

      <input type="password" className="form-control" placeholder="Password" required 
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    </form>
  )
}

export default Login;