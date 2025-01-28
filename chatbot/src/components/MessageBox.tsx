"use client";
import send from "@/app/lib/sendMessage";
import { TextInput } from "flowbite-react"
import { useContext, useState } from "react";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Spinner } from "flowbite-react";


export default function MessageBox(props: any) {

    const {userMessages,setUserMessages,
            systemMessages,setSystemMessages,
            sessionID,setSessionID
        } = useContext(MessageRoomContext)

    const [message, setMessage] = useState<string>('');
    const [isMessageThreadEmpty, setIsMessageThreadEmpty] = useState<boolean>(false);
    const [isLoading,setIsLoading] =useState<boolean>(false); 
    
    async function submitMessage(){
        setIsLoading(true);
        const res = await send(message);
        setSessionID(res.sessionID);
        setMessage('');
        setIsMessageThreadEmpty(false);
        setIsLoading(false);
    }
    return (
        <>

            <div className={`flex items-center p-1 w-[90%] rounded-lg bg-gray-700  ${isMessageThreadEmpty ? 'bottom-1/4':'bottom-4'}`}>

                <textarea id="chat" onChange={(e) => {
                    setMessage(e.target.value);
                    }} value={message} className="block resize-none mx-4 p-2.5 h-20 w-full text-sm rounded-lg  font-sfpro  bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Send a message to ROBCHAT AI"></textarea>
                <button onClick={submitMessage} type="submit" className={`${message.length == 0 || isLoading && 'disabled'} inline-flex justify-center p-2 ${message.length == 0 ? 'text-gray-500':'text-blue-500'}  hover:bg-gray-600`}>
                    
                    {!isLoading? <><svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span></>:<Spinner/>}
                </button>
            </div>
        </>
    )
}