import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [firstname, setfirstname] = useState("");
    const [image, setimage] = useState("");
    const [imagefile, setimagefile] = useState("");

    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        setfirstname(localStorage.getItem("reactStorage"))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:5009/user/verify", {
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
            if (err) {
                localStorage.removeItem("token")
                navigate("/login")
            }
        })
    }, [])

    console.log(firstname);

    const changefile = (event) => {
        console.log(event.target.files[0]);
        let file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            console.log(reader.result);
            setimagefile(reader.result)
        }
    }

    const upload = () =>{
        axios.post("http://localhost:5009/user/upload",{imagefile}, {
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((res) => {
            console.log(res.data.image);
            setimage(res.data.image)
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <div>
                <h1>Hi <span>{firstname}</span>!</h1>
                <input onChange={(e) => changefile(e)} type="file" />
                <button onClick={upload}>Upload</button>
                <img src={image} alt="" />
            </div>
        </>
    )
}


export default Dashboard