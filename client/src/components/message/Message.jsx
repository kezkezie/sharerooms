import React from 'react'
import './message.css'
import {format} from "timeago.js"

export default function Message({own, message}) {
  return (
    <>
        <div className={ own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
                className='messageImg'
                src=''
                alt=''
            />
            <p  className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    </>
  )
}
