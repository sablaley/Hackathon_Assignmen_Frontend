import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import img1 from '../images/image 289.png'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function Login() {
  const [passShow, setPassShow] = useState(false)
  const [confirmPassShow, setConfirmPassShow] = useState(false)
  const [regPassShow, setRegPassShow] = useState(false)
  const [flag, setFlag] = useState(true)
  const navigate = useNavigate('')
  const [inputVal, setInputVal] = useState({
    name: '',
    email: '',
    password: '',
    rpassword: ''
  })

  const [loginData, setLoginData] = useState({
    email: '',
    pwd: ''
  })

  const openPage = () => {
    setFlag(!flag)
  }

  const setVal = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target
    // console.log(name, value);
    setInputVal({
      ...inputVal, [name]: value
    })
  }

  const setLoginVal = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const registerData = (e) => {
    e.preventDefault()
    const { name, email, password, rpassword } = inputVal
    if (name === '') {
      toast.error('Please Enter Your Name')
    } else if (email === '') {
      toast.error('please Enter Your Email')
    } else if (!email.includes('@')) {
      toast.error('Please Enter Valid Email')
    } else if (password === '') {
      toast.error('Please Enter Your Password')
    } else if (password.length < 6) {
      toast.error('Password must be 6 char')
    } else if (rpassword === '') {
      toast.error('Please Enter Your Confirm Password')
    } else if (password !== rpassword) {
      toast.error('Password and Confirm Password not Match')
    } else {
      register()
    }
  }

  const register = async () => {
    let data = await fetch('http://localhost:5000/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputVal)
    })
    data = await data.json()
    // console.log(data);
    if (data.status === 201) {
      toast.success('Registration Successfully Done')
      setInputVal({ ...inputVal, name: '', email: '', password: '', rpassword: '' })
    } else {
      toast.error(data.msg)
    }
  }

  const addData = (e) => {
    e.preventDefault()
    const { email, pwd } = loginData
    if (email === '') {
      alert('please Enter Your Email')
    } else if (!email.includes('@')) {
      alert('Please Enter Valid Email')
    } else if (pwd === '') {
      alert('Please Enter Your Password')
    } else if (pwd.length < 6) {
      alert('Password must be 6 char')
    } else {
      login()
    }
  }


  const login = async () => {
    let data = await fetch('http://localhost:5000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
    data = await data.json()
    if (data.status === 201) {
      localStorage.setItem('token', data.result.token)
      navigate('/home')
      setTimeout(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Successfully Done",
          showConfirmButton: false,
          timer: 1000
        });
      },200)
      setInputVal({ ...loginData, email: '', pwd: '' })
    } else {
      alert(data.msg)
    }
  }

  return (
    <div className='main_box'>
      <section className='login_section' style={{ display: flag ? "flex" : "none" }}>
        <div className='login_box'>
          <div className='text-center'>
            <img src={img1} alt="DigitalFlake Logo" className="header_logo" />
          </div>
          <p className='m-0'>Welcome to DigitalFlake Admin</p>
          <form className='login_form'>
            <div>
              <label>Email Address</label>
              <input type="Email" className="form-control" name='email' value={loginData.email} onChange={setLoginVal} autocomplete='off'/>
            </div>
            <div>
              <label className="sec">Password</label>
              <div className='pwd_visibilty'>
                <input className="form-control" type={!passShow ? "password" : "text"} name='pwd' value={loginData.pwd} onChange={setLoginVal} autocomplete='off' />
                <div onClick={() => setPassShow(!passShow)} className='pwd_visibility_icon'>
                  {!passShow ? <span className="material-symbols-outlined">
                    visibility_off
                  </span> : <span className="material-symbols-outlined">
                    visibility
                  </span>}
                </div>
              </div>
              <a href="" className='pwd' >forget password?</a>
            </div>
            <button className="login-btn" onClick={(e) => addData(e)}>Log In</button>
            <span className='reg_parent'>Don't have an account yet? <a className='reg' onClick={openPage}>Register</a></span>
          </form>
        </div>
      </section>
      <section className='register_section' style={{ display: flag ? "none" : "flex" }}>
        <div className='register_box'>
          <div className='text-center'>
            <img src={img1} alt="DigitalFlake Logo" className="header_logo" />
          </div>
          <p className='m-0'>Welcome to DigitalFlake Admin</p>
          <form className='register_form' >
            <div>
              <label>Name</label>
              <input className="form-control" type="text" value={inputVal.name} name="name" onChange={(e) => setVal(e)} autocomplete='off'/>
            </div>
            <div>
              <label>Email Address</label>
              <input className="form-control" type="text" name="email" value={inputVal.email} onChange={setVal} autocomplete="off" />
            </div>
            <div>
              <label className="sec">Password</label>
              <div className='pwd_visibilty'>
                <input className="form-control" type={!regPassShow ? "password" : "text"} name="password" value={inputVal.password} onChange={setVal} autocomplete="off" />
                <div className='pwd_visibility_icon' onClick={() => setRegPassShow(!regPassShow)}>
                  {!regPassShow ? <span className="material-symbols-outlined">
                    visibility_off
                  </span> : <span className="material-symbols-outlined">
                    visibility
                  </span>}
                </div>
              </div>
            </div>
            <div>
              <label className="sec">Repeat Password</label>
              <div className='pwd_visibilty'>
                <input className="form-control" type={!confirmPassShow ? "password" : "text"} name="rpassword" value={inputVal.rpassword} onChange={setVal} autocomplete="off"/>
                <div className='pwd_visibility_icon' onClick={() => setConfirmPassShow(!confirmPassShow)}>
                  {!confirmPassShow ? <span className="material-symbols-outlined">
                    visibility_off
                  </span> : <span className="material-symbols-outlined">
                    visibility
                  </span>}
                </div>
              </div>
            </div>
            <button className="register-btn" onClick={(e) => registerData(e)}>Register</button>
            <span className='reg_parent'>Already have an account? <a className='reg' onClick={openPage}>Login</a> </span>
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>

    </div>
  )
}
