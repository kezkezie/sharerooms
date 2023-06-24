import { React, useEffect, useState } from 'react'
import { Avatar, Image, message } from 'antd'
import InputText from './InputText'

export default function ChatBox() {
    // console.log(localStorage.getItem("currentUser").data.name)
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser"))) {
            window.location.href = '/login'
            return;
        }
    }, [])
    return (
        <>
        <ChatBoxReceiver 
         user = {JSON.parse(localStorage.getItem("currentUser")).data.name} 
         avatar="https://picsum.photos/200/300"
         message="hello world we are here"
         />

         <ChatBoxSender 
         user = 'sender' 
         avatar="https://picsum.photos/200"
         message="hello world we are here"
         />
         <InputText addMessage={(message) => console.log(message.message)}/>
        </>
    )
}


export function ChatBoxReceiver({avatar, user, message}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row ' }}>
            <Avatar
                size={50}
                src={<Image
                    src={avatar}
                    style={{
                        objectFit:'cover',
                        width:45,
                        height:45,
                        borderRadius:"100%",
                    }}
                    preview = {false}
                />}
            />

            <div style={{ backgroundColor:'#dcf8c6',padding:5, maxHeight:"50%",  maxWidth:"60%", borderRadius: 10,}}>
            <p >
            <strong style={{fontSize:13, margin:0, paddingBottom:0}}>
                    {user}
                </strong> 
            </p>

            <p style={{margin:0, paddingTop:0}}>
                
                {message}
            </p>
            </div>
        </div>
    )
}


export function ChatBoxSender({avatar, user, message}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row ' }}>
            <Avatar
                size={50}
                src={<Image
                    src={avatar}
                    style={{
                        objectFit:'cover',
                        width:45,
                        height:45,
                        borderRadius:"100%",
                    }}
                    preview = {false}
                />}
            />

            <div style={{ backgroundColor:'#F5F5F5',padding:5, maxHeight:"50%",  maxWidth:"60%", borderRadius: 10,}}>
            <p >
            <strong style={{fontSize:13, margin:0, paddingBottom:0}}>
                    {user.name}
                </strong> 
            </p>

            <p style={{margin:0, paddingTop:0}}>
                
                {message}
            </p>
            </div>
        </div>
    )
}