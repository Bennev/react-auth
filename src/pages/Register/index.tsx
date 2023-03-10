import React, { SyntheticEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'
import api from '../../services/api'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submitEvent = async (e: SyntheticEvent) => {
    e.preventDefault()

    await api.post(
      '/users/register',
      JSON.stringify({
        firstName,
        lastName,
        email,
        password
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <form className="form-signup" onSubmit={submitEvent}>
      <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

      <input
        type="name"
        className="form-control"
        placeholder="First Name"
        required
        onChange={e => setFirstName(e.target.value)}
      />

      <input
        type="name"
        className="form-control"
        placeholder="Last Name"
        required
        onChange={e => setLastName(e.target.value)}
      />

      <input
        type="email"
        className="form-control"
        placeholder="Email Address"
        required
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit
      </button>
    </form>
  )
}

export default Register
