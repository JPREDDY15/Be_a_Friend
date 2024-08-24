import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import LeftSidebar from '../../components/leftSidebar/LeftSidebar';
import ChatBox from '../../components/Chatbox/ChatBox';
import RightSidebar from '../../components/rightSidebar/RightSidebar';
import { AppContext } from '../../contex/AppContext';

const Chat = () => {
  const {chatData,userData}=useContext(AppContext);
  const[loading,setloading]=useState(true);
  useEffect(()=>{
    if(chatData && userData)
    {
      setloading(false)
    }
  },[chatData,userData])
  return (
    <div className="chat">
      {loading? <p className="loading">Loading...</p>:<div className="chat-container">
            <LeftSidebar/>
            <ChatBox/>
            <RightSidebar/>
        </div> }
        
    </div>
  );
}

export default Chat;
