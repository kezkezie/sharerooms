import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './ChatOnline.css'

export default function ChatOnline({ onlineUsers, currentId, setcurrentChat }) {
    const [freinds, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getOwners = async () => {
            const res = await axios.get("/api/getuser/" + currentId);
            setFriends(res.data);
        };
        getOwners()
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(freinds.filter((f) => onlineUsers.includes(f._id)));
    }, [freinds, onlineUsers]);
    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => {

                <div className="chatOnlineFriend">

                    <div className="chatOnlineImgContainer">
                        <img
                            className='chatOnlineImg'
                            src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dmb%2BLogo&psig=AOvVaw0p8nGg-l-X7Nt7cK0berLS&ust=1687600459806000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCjoOGP2f8CFQAAAAAdAAAAABAE'
                            alt=''
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o.name}</span>
                </div>
            })}
        </div>
    )
}
