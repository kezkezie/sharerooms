
import {React, useEffect, useState} from 'react'
import axios from "axios"
import './message.css'
import {format} from "timeago.js"

export default function Message({own, message, user}) {
  
  return (
    <>
        <div className={ own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
                className='messageImg'
                src= "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fdefault-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392%3Fk%3D6%26m%3D1223671392%26s%3D170667a%26w%3D0%26h%3DzP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU%3D&f=1&nofb=1&ipt=90f70c28773343b121994b96f93d550557a992afb93b7981f3bfa5e2f6915663&ipo=images"
                alt=''
            />
            <p  className='messageText'>{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    </>
  )
}
