import "./style.css"
import { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { RootState } from "../../store"
import { loginUser } from "../../store/ducks/users"

const Login = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const { user } = useSelector((state: RootState) => state.Users);
  const dispatch: Dispatch<any> = useDispatch();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
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
    .then(res => {
      console.log(res.data)
      dispatch(loginUser(res.data))
    })

    // console.log(user)
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