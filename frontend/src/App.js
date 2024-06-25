import './App.css';
import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';
import Chat from './Chat';
import socketClient from 'socket.io-client'
import { useRef } from 'react';

const App = () => {
  const endpoint = "http://localhost:5009"
  const socket = useRef(socketClient(endpoint))
  console.log(socket.current);

  // const token = localStorage.getItem("token")
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/forgot' element={<Forgotpassword/>}/>
        <Route path='/reset' element={<Resetpassword/>}/>
        <Route path='/chat' element={<Chat socket={socket.current}/>}/>
      </Routes>
    </div>
  )
}

export default App