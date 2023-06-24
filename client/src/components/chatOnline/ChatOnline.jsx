import React from 'react'
import './ChatOnline.css'

export default function ChatOnline() {
  return (
   <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img
                    className='chatOnlineImg' 
                    src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dmb%2BLogo&psig=AOvVaw0p8nGg-l-X7Nt7cK0berLS&ust=1687600459806000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCjoOGP2f8CFQAAAAAdAAAAABAE'
                    alt=''
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">John Doe</span>
        </div>
   </div>
  )
}
