import { React, useContext, useEffect, useState, useRef } from 'react'
import Conversations from '../conversations/Conversations'
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import './Messanger.css'
import {io} from 'socket.io-client'
import { useLocation } from 'react-router-dom';

export default function Messanger() {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setcurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();
    const location = useLocation();


    const user = JSON.parse(localStorage.getItem('currentUser')).data._id

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
            
        })

    }, []);


    const createOwnerChat = async (id) => {
        const resp = await axios.post('/conversations',{
            senderId: user,
            receiverId: id
        })
        if(resp.status === 409) {
            setcurrentChat(null)
            try {
                const res = await axios.get("/conversations/" + user)
                setConversations(res.data)
                return;
            } catch (error) {
                console.log(error)

            }
        }

        const res = await axios.get("/conversations/" + user)
        setConversations(res.data)
        setcurrentChat(resp.data)
    }

    useEffect(() => {
        if(location.state !== null && location.state.userId ) {
            createOwnerChat(location.state.userId)
        }
    },[location.state])

    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage, currentChat])

    useEffect(() => {
        //send to server with .emit in socket.io
        socket.current.emit("addUser", user);
        // get from the server with .on on socket.io
        socket.current.on("getUsers", users =>{
            console.log(users)
            setOnlineUsers(users)
        })
    },[user]);

   

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user)
                setConversations(res.data)
            } catch (error) {
                console.log(error)

            }
        };
        getConversations();
    }, [JSON.parse(localStorage.getItem('currentUser')).data._id]);

    useEffect(() => {
        const getMessages = async () => {

            try {
                const res = await axios.get("/messages/" + currentChat?._id)
                setMessages(res.data)

            } catch (error) {
                console.log(error)


            }
        };
        getMessages();

    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user
        );
        socket.current.emit("sendMessage", {
            senderId: user,
            receiverId,
            text:newMessage
        })

        try {
            const res = await axios.post("/messages", message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

   

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])




    return (


        <>
            <Navbar />
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className="chatMenuWrapper">
                        <input placeholder='search' className='chatMenuInput'></input>
                        {conversations.map(conv => (
                            <div onClick={() => setcurrentChat(conv)}>
                                <Conversations conversation={conv} currentUser={user} />
                            </div>

                        ))}


                    </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">




                        {
                            currentChat ?


                                <>
                                    <div className="chatBoxTop">
                                        {messages && messages.map(m => (
                                            <div ref={scrollRef}>


                                                <Message message={m} own={m.sender === user} user ={m.sender === user} />
                                            </div>
                                        )

                                        )}

                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea
                                            className='chatMessageInput'
                                            placeholder='text here...'
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            value={newMessage}
                                        ></textarea>
                                        <button className='chatSubmitButton' onClick={handleSubmit}>send</button>
                                    </div>
                                </> : <span className='noConversationText'>chat here...</span>
                        }
                    </div>
                </div>
                {/* <div className='chatOnline'>
                    <div className="chatOnlineWrapper">
                        <ChatOnline 
                            onlineUsers={onlineUsers} 
                            currentId={user}
                            setcurrentChat={setcurrentChat}
                        />
                    </div>
                </div> */}

            </div>
        </>
    )
}