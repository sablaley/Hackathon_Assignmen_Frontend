import React, { useContext, useEffect } from 'react'
import img1 from '../images/image 289.png'
import './Home.css'
import { LoginContext } from '../components/ContextProvider/Context'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { contextData, setContextData } = useContext(LoginContext)
  const navigate = useNavigate('')
  // console.log('contextData', contextData);

  useEffect(() => {
    validDashboardUser()
  }, [])

  const validDashboardUser = async () => {
    let token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5000/validAdminUser', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await res.json()
    if (data.status === 401 || !data) {
      navigate('/')
      // console.log('error page redirect');
    }
    else {
      // console.log("user verify");
      setContextData(data)
      navigate('/home')
    }
  }

  return (
    <>
      {contextData ?
        <section className='homepage'>
          <div className='text-center'>
            <img src={img1} alt="homepage_image" />
            <h4>Welcome To Digital Flake Admin </h4>
          </div>
        </section>
        :
        null
      }
    </>
  )
}
