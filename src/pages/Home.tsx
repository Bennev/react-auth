import React, { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    (
      async () => {
        await fetch('http://localhost:8000/api/auth/login', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
      }
    )()
  })

  return (
    <div>
      Home
    </div>
  )
}

export default Home;