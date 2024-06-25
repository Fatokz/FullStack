import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    const login = () => {
        console.log(email, password);
        let userlogin = {
            email, password
        }
        axios.post("http://localhost:5009/user/login", userlogin)
            .then((res) => {
                console.log(res);
                alert(res.data.message)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("reactStorage", res.data.username)
                navigate('/dashboard')
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className='w-50 mx-auto shadow px-3 py-3 mt-5'>
                <h1 className='text-primary text-center '>Login</h1>
                <div className='form-group mt-3'>
                    <label htmlFor="">Email</label>
                    <input className='form-control' onChange={(e) => setemail(e.target.value)} type="text" />
                </div>
                <div className='form-group mt-3'>
                    <label htmlFor="">Password</label>
                    <input className='form-control' onChange={(e) => setpassword(e.target.value)} type="text" />
                </div>
                <Link to= "/forgot"><p className='text-primary fs-6'>Forgot Password</p> </Link>
                <div className='text-center'>
                    <button onClick={login} className='btn btn-primary mx-auto mt-3'>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login