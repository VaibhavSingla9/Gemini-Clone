import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import {assets} from "../../assets/assets"
import { Context } from '../../context/context';
const Sidebar = () => {
    // adding functionality for opening and removing the sidebar 

    const [extended, setExtended] = useState(false); // initailly extended false ha 
    const {onSent, prevPrompt,setRecentPrompt , newChat} = useContext(Context);

    const loadPrompt = async(prompt)=>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    }

  return (
    <div className='sidebar'>
      {/* create 2 div  */}

      {/* one for top */}
      <div className='top'>
        <img  onClick={()=>{
            setExtended((prev) => !prev)
        }} className="menu" src={assets.menu_icon} alt=""></img>
        <div onClick ={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt=""></img>
            {extended ? <p>New Chat </p> : null}
        </div>

        {extended ?
        <div className='recent'>
            <p className='recent-title'>Recent</p>
            {prevPrompt.map((item, index)=>{
              return (
                 <div  onClick={()=>loadPrompt(item)} className='recent-entry'>
                <img src={assets.message_icon} alt=""></img>
                <p>{item.slice(0,15)} ...</p>
            </div>
              )
            })}
           
        </div> : null}
      </div>

      {/* one for bottom */}
      <div className='bottom'>
        <div className='bottom-item recent-entry'>
            <img src={assets.question_icon} alt=""></img>
            {/* ager extended true hoga then only p tag show karo verna nahi */}
           {extended?<p>Help</p>:null}
        </div>
         <div className='bottom-item recent-entry'>
            <img src={assets.history_icon} alt=""></img>
            {extended ?<p>Activity</p> : null}
        </div>
         <div className='bottom-item recent-entry'>
            <img src={assets.setting_icon} alt=""></img>
            {extended ? <p>Settings</p> : null}
        </div>
      </div>

    </div>
  )
}

export default Sidebar
