
"use client";
// import ChatLayout from '@/components/ChatPageLayout'
import MessageBox from '@/components/MessageBox'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createContext, useContext, useEffect, useState } from 'react'
import { MessageRoomContext } from '../Providers/messageRoomContext'
import MessageThread from '@/components/MessageThread';
import { Message } from '@/utils/definitions';


export default function Page() {    
        const {
            messages, setMessages,
            sessionID,setSessionID,
            message, setMessage,
            isResponseLoading, setIsResponseLoading,
            isMessageThreadEmpty,setIsMessageThreadEmpty
          } = useContext(MessageRoomContext)
        return (

            <div className="h-[90vh] flex items-center flex-col">
                {
                    isMessageThreadEmpty ?
                        <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center my-24 ">What can I do for you today?</h1>
                        :
                        <div className=" w-[90%] h-screen py-5 overflow-x-auto flex flex-col space-y-5 mb-2">
                            {messages.map((m:Message, i:number) => (<MessageThread listID={i}
                               messageExchange={m} key={i} />))}
                        </div>
                }
                <MessageBox />
            </div>
    )

}

