import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Signup = () => {
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    const signup = () =>{
        console.log(firstname, lastname, email, password);
        let userdetails = {
            firstname, lastname, email, password
        }
        axios.post("http://localhost:5009/user/register",userdetails)
        .then((res)=>{
            console.log(res);
            alert(res.data.message)
            navigate("/login")
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <>
            <div className='w-50 mx-auto shadow px-3 py-3 mt-5'>
                <h1 className='text-primary text-center '>Signup</h1>
                <div className='form-group'>
                    <label htmlFor="">Firstname</label>
                    <input className='form-control' onChange={(e) => setfirstname(e.target.value)} type="text" />
                </div>
                <div className='form-group mt-3'>
                    <label htmlFor="">Lastname</label>
                    <input className='form-control' onChange={(e) => setlastname(e.target.value)} type="text" />
                </div>
                <div className='form-group mt-3'>
                    <label htmlFor="">Email</label>
                    <input className='form-control' onChange={(e) => setemail(e.target.value)} type="text" />
                </div>
                <div className='form-group mt-3'>
                    <label htmlFor="">Password</label>
                    <input className='form-control' onChange={(e) => setpassword(e.target.value)} type="text" />
                </div>
                <div className='text-center'>
                    <button onClick={signup} className='btn btn-primary mx-auto mt-3'>Register</button>
                </div>
            </div>
        </>
    )
}

export default Signup