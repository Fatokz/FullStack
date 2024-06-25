import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Resetpassword = () => {
    const [otp, setotp] = useState()
    const [password, setpassword] = useState()

    let otps = localStorage.getItem("otp")
    let email = localStorage.getItem("email")

    const navigate = useNavigate()

    const reset = () => {
        if (otp !== otps) {
            alert("wrong otp")
        } else {
            console.log("working");
            axios.post("http://localhost:5009/user/reset", { password, email })
                .then((res) => {
                    console.log(res);
                    navigate("/login")
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <div>
            <div className='card mx-auto w-50 px-3 py-2 bg-white shadow mt-2'>
                <input className='form-control mt-3' onChange={(e)=> setotp(e.target.value)} placeholder="Enter OTP" type="text" />
                <input className='form-control mt-3' onChange={(e)=> setpassword(e.target.value)} placeholder="Enter new password" type="text" />
                <button className='mt-3 btn btn-primary' onClick={reset}>Reset Password</button>
            </div>
        </div>
    )
}

export default Resetpassword