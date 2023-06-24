import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";
import { ChatBoxReceiver, ChatBoxSender } from './ChatBox'
import InputText from './InputText';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


export default function ChatContainer({location}) {
    let socketio = socketIOClient("http://localhost:600")
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")).data.name)
    const [avatar, setAvatar] = useState('https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67')

    useEffect(
        () => {
            socketio.on('chat', senderChats => {
                setChats(senderChats)
            })
           
        }
    )


    function sendChatToSocket(chat) {
        socketio.emit("chat", chat)
    }

    function addMessage(chat) {
        const newChat = { ...chat, user, avatar }
        setChats([...chats, newChat])
        sendChatToSocket([...chats, newChat])
    }
    

    function ChatsList() {
        return chats.map((chat, index) => {
            if (chat.user === user) return <ChatBoxReceiver user={user} key={index} message={chat.message} avatar={chat.avatar} />
            if (location.state !== null) return <ChatBoxSender key={index} message={chat.message} user={location.state.user} avatar={chat.avatar} />

        })
    }

    const currentuser = JSON.parse(localStorage.getItem("currentUser"))
    return (
        currentuser &&
        <div>
           

            <ChatsList />
            <InputText addMessage={addMessage} />


        </div>
    )
}
