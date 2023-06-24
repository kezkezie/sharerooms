import {React, useEffect, useState} from 'react'
import axios from "axios"
import './conversations.css'

export default function Conversations({conversation, currentUser}) {

  const [user, setUser] = useState(null)

  useEffect(()=>{
    const ownerId = conversation.members.find(m=> m !== currentUser);

    const getUser = async ()=>{
      try{
        const resp = await axios.get(`/api/user/getuser/${ownerId}`)
                setUser(resp.data)
      }catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [conversation, currentUser]);
  return (
    <div className='conversations'>
        <img 
            className='conversationImg'
            src={
              user &&  user.profileUrl.length < 0 ? user.profileUrl : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fdefault-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392%3Fk%3D6%26m%3D1223671392%26s%3D170667a%26w%3D0%26h%3DzP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU%3D&f=1&nofb=1&ipt=90f70c28773343b121994b96f93d550557a992afb93b7981f3bfa5e2f6915663&ipo=images"}
            alt=''

        />
        <span className='conversationName'>{user && user.name}</span>
        
    </div>
  )
}
