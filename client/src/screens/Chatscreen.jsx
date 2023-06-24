import { ChatEngine } from "react-chat-engine";
import { React, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import ChatContainer from "../components/ChatContainer";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios'

const ChatsPage = () => {
    // useEffect(() => {
    //     if (!JSON.parse(localStorage.getItem("currentUser"))) {
    //         window.location.href = '/login'
    //         return;
    //     }
    // }, [])

    const location = useLocation()

    return (
        <div className="background" style={{ height: '100vh' }}>
            <Navbar />
            <ChatContainer
                location={location}
            />
        </div>
    );
};

export default ChatsPage;
