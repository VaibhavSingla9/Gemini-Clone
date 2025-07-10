import React, { useContext } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'

const Main = () => {

    // get the state and function using the context api
    const {onSent , recentPrompt , showResult , loading , resultData , setInput , input } =  useContext(Context); 

  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt=""></img>
        </div>

        <div className='main-container'>

            {!showResult?<>

            <div className='greet'>
                <p><span>Hello, Vaibhav</span></p>
                <p>How can i help you today?</p>
            </div>
            <div className='cards'>
                <div className='card'>
                    <p>Suggest beautiful places to see on an upcomming road trip</p>
                    <img src={assets.compass_icon} alt=""></img>
                </div>
                 <div className='card'>
                    <p>Briefly Summarize this comcepts : urban plannin</p>
                    <img src={assets.bulb_icon} alt=""></img>
                </div>
                 <div className='card'>
                    <p>Brainstorm team bonding activites for our work retreat</p>
                    <img src={assets.message_icon} alt=""></img>
                </div>
                 <div className='card'>
                    <p>Improve the readability of the following codes</p>
                    <img src={assets.code_icon} alt=""></img>
                </div>
            </div>

            </> 
            : <div className='result'>
                <div className='result-title'>
                    <img src={assets.user_icon} alt=""></img>
                    <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    <img src={assets.gemini_icon} alt=""></img>
                    {/*  agar loading true ha loader ko display karo verna result ko diplay kar do */}
                    {loading ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                        </div> 
                        :<p dangerouslySetInnerHTML={{__html:resultData}} ></p>
                        }
                    
                    </div>
                </div>
            }


            <div className='main-bottom'>
                <div className='search-box'>
                    <input  onChange={(e)=>setInput(e.target.value)} value={input}  type="text" placeholder='Enter a prmopt here'></input>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon}  alt="" />
                        {input ?<img onClick={()=>onSent()} src={assets.send_icon}  alt="" />:null}
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info , including about people , so double - check its results
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main
