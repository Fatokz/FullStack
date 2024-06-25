import React, {useState} from 'react'

const Chat = ({socket}) => {
    const token = localStorage.getItem("token")
    socket.emit("authenticate", token)
    const [chat, setchat] = useState("")
    const [allchat, setallchat] = useState([])

    const send = () =>{
        console.log(chat);
        socket.emit("newmessage", chat)
    }

    socket.on("receivedchat", (chat)=>{
        console.log(chat);
        setallchat([...allchat, chat])
    })

  return (
    <div>
        <div className='w-50 py-4 px-4 mx-auto'>
            <div>
                {allchat.map((el)=>(
                    <h4>{el}</h4>
                ))}
            </div>
        <div className='d-flex justify-content-center items-center'>
            <input className='form-control' onChange={(e)=>setchat(e.target.value)} type="text" />
            <button className='btn btn-primary' onClick={send}>Send</button>
        </div>
        </div>
    </div>
  )
}

export default Chat