import { createContext, use, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props)=>{

    // state variable 
    // to save the input data 
    const [input , setInput] = useState("");

    // input data will be saved in the recentPrompt
    const [recentPrompt , setRecentPrompt] = useState("");

    // declared as an array to store an input history 
    const [prevPrompt, setPrevPrompt] = useState([]);

    // once it is true it will hide the greet boxes and display result
    const [showResult, setShowResult] =useState(false);

    // display the loading when the result is not show and when it is tture the loading will be removed and result will be shown 
    const [loading , setLoading] = useState(false);

    // used to display the result on our web page 
    const [resultData , setResultData] = useState("");

    const delayPara = (index, nextWord)=>
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);

        },75*index)

        // when clcik on new chat new page will be shown 
        const newChat = ()=>{
            setLoading(false)
            setShowResult(false)
        }


    // onSent jo input aye ga input useSate sa usa runChat ma prompt bheja ga and geminin uska answer print kare ga 
    const onSent =async(prompt)=>{
        setResultData(""); // reset the result data so that previous result is removed 
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
      
        let responseArray = response.split("**");
        let newResponse ="";
        for(let i=0 ; i< responseArray.length ; i++){
            if(i === 0 || i%2 !==1){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>"
            }
        }

        // where we get * will will repace it br 
        let newResponse2 = newResponse.split("*").join("</br>")



        let newResponseArray = newResponse2.split(" ");

        for(let i =0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("") // input feild will be reset
    }

    

    const contextValue = {
        prevPrompt , 
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
        
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider; 