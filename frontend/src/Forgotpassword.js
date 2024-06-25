import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Forgotpassword = () => {
    const [email, setemail] = useState("")
    const navigate = useNavigate()

    const send = () =>{
        console.log(email);
        axios.post("http://localhost:5009/user/forgot", {email})
        .then((res)=>{
            console.log(res.data.Otp);
            localStorage.setItem("otp", res.data.Otp)
            localStorage.setItem("email", res.data.email)
            navigate("/reset")
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div>
            <div className='card mx-auto w-50 px-3 py-2 bg-white shadow'>
                <p className='text-muted text-center mt-3'>Enter your valid Email Adress</p>
                <input onChange={(e)=>setemail(e.target.value)} className='form-control mt-3' type="email" placeholder='Enter your mail' />
                <button onClick={send} className='mt-3 btn btn-primary'>Send</button>
            </div>
        </div>
    )
}

export default Forgotpassword