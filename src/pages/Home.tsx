import React, { useEffect, useState, SyntheticEvent } from 'react'
import axios from 'axios'

const Home = (props: any) => {
    const [content, setContent] = useState({
      email: '',
      firstName: '',
      lastName: '',
      id: '',
    })

  // useEffect(() => {
  //   (
  //     async () => {
  //       await fetch('http://localhost:8000/api/user/id', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: 'include',
  //       })
  //     }
  //   )()
  // })

  useEffect(() => {
    const submit = async () => {
  
      const response = await axios({
        url: `http://localhost:8000/api/users/${props.idNumber.id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.idNumber.token}`,
        },
        withCredentials: true,
      })
      .then(res => setContent(res.data))
      

      // const info = await response.data;
      // console.log(info)
      // setContent(info)
    }

    submit();
  }, [])

  return (
    <div>
      <p>{props.idNumber.id}</p>
      <p>{props.idNumber.token}</p>
      <p>Oi, meu nome é {content.firstName} {content.lastName}</p>
    </div>
  )

}

export default Home;