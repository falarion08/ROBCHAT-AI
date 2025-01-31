"use client";
import MessageBox from "@/components/MessageBox"
import retrieve from "../lib/userInfoRetriever"
import { useEffect, useState } from "react"
import { createContext } from "react";
import { MessageRoomContext } from "../Providers/messageRoomContext";
import MessageThread from "@/components/MessageThread";
import { Message } from "@/utils/definitions";
import getBotResponse from "@/utils/getBotResponse";



export default function Page() {

    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionID, setSessionID] = useState<string | undefined>();
    const [message, setMessage] = useState<string>("");
    const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
    const [isMessageThreadEmpty, setIsMessageThreadEmpty] = useState<boolean>(true);

    useEffect(() => {
        // const getData = async () => {
        //     const response = await getBotResponse(message);
        //     console.log(response)
            // let newMessages = messages.map((m,i)=>{
            //     if(i == messages.length-1)
            //         return {userMessage : m.userMessage, systemMessage: response};
            //     else
            //         return m;
            // })
        //     setMessages(newMessages);
        //     setIsResponseLoading(false);
            
        // }

        // if (messages.length > 0 && messages[messages.length - 1].systemMessage === undefined)
        //     getData();
        const getData = async(message:string)=> {
            const response = await getBotResponse(message)
            console.log(response);

            let newMessages = messages.map((m,i)=>{
                if(i == messages.length-1)
                    return {userMessage : m.userMessage, systemMessage: response};
                else
                    return m;
            })


            setMessages(newMessages);
            setIsResponseLoading(false);
        }
        if(isResponseLoading)
            getData(messages[messages.length-1].userMessage)
 
    }, [isResponseLoading]);


    return (
        <MessageRoomContext.Provider value={{
            messages, setMessages,
            setSessionID,
            message, setMessage,
            isResponseLoading, setIsResponseLoading,
            setIsMessageThreadEmpty
        }}>
            <div className="h-[90vh] flex items-center flex-col">
                {
                    isMessageThreadEmpty ?
                        <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center my-24 ">What can I do for you today?</h1>
                        :
                        <div className=" w-[90%] h-screen py-5 overflow-x-auto flex flex-col space-y-5 mb-2">
                            {messages.map((m, i) => (<MessageThread listID={i}
                               messageExchange={m} key={i} />))}
                        </div>
                }
                <MessageBox />
            </div>
        </MessageRoomContext.Provider>
    )
}