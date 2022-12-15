import React, { SyntheticEvent, useState } from 'react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitEvent = async (e: SyntheticEvent) => {
    e.preventDefault()

    const response = await fetch('#', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const content = await response.json()

    console.log(content)

  }

  return (
    <form onSubmit={submitEvent}>
      <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

      <input type="name" className="form-control" placeholder="Name" required 
        onChange={e => setName(e.target.value)}
      />

      <input type="email" className="form-control" placeholder="Email Address" required 
        onChange={e => setEmail(e.target.value)}
      />

      <input type="password" className="form-control" placeholder="Password" required 
        onChange={e => setPassword(e.target.value)}
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  )
}

export default Register;