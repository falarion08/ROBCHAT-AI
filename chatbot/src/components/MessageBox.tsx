"use client";
import { useContext, useState } from "react";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Spinner } from "flowbite-react";
import { Message } from "@/utils/definitions";
import save from "@/app/lib/saveSession";
import getBotResponse from "@/utils/getBotResponse";


export default function MessageBox(props: any) {

    const { messages, setMessages,
        setSessionID,
        message, setMessage,
        isResponseLoading, setIsResponseLoading,
        setIsMessageThreadEmpty
    } = useContext(MessageRoomContext);



    async function submitMessage() {

        if (message.length > 0) {
            let messageExchange: Message = {
                userMessage: message,
                systemMessage:undefined 
            }
            setMessages([...messages, messageExchange])

            setIsResponseLoading(true);
            setIsMessageThreadEmpty(false);

            // Send a message to Chatbot
            const sessionID = await save(message);

            // Store message from user and the response from the bot

            setSessionID(sessionID);

            // Clear out message box for new input
            setMessage('');
        }
    }
    return (
        <>

            <div className={`flex items-center p-1 w-[90%] rounded-lg bg-gray-700`}>

                <textarea id="chat" onChange={(e) => {
                    setMessage(e.target.value);
                }} value={message} className="block resize-none mx-4 p-2.5 h-20 w-full text-sm rounded-lg  font-sfpro  bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Send a message to ROBCHAT AI"></textarea>
                <button onClick={submitMessage} type="submit" className={`${message.length == 0 || isResponseLoading && 'disabled'} inline-flex justify-center p-2 ${message.length == 0 ? 'text-gray-500' : 'text-blue-500'}  hover:bg-gray-600`}>

                    {!isResponseLoading ? <><svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                        <span className="sr-only">Send message</span></> : <Spinner />}
                </button>
            </div>
        </>
    )
}