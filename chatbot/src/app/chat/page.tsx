"use client";
import MessageBox from "@/components/MessageBox"
import retrieve from "../lib/userInfoRetriever"
import { useEffect, useState } from "react"
import { createContext } from "react";
import { MessageRoomContext } from "../Providers/messageRoomContext";
import MessageThread from "@/components/MessageThread";



export default function Page() {

    const [userMessages, setUserMessages] = useState<string[]>([]);
    const [systemMessages, setSystemMessages] = useState<string[]>([]);
    const [sessionID, setSessionID] = useState<string | undefined>();


    return (
        <MessageRoomContext.Provider value={{
            userMessages, setUserMessages,
            systemMessages, setSystemMessages,
            sessionID, setSessionID
        }}>
            <div className="h-[90vh] flex items-center flex-col">
                {/* <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center my-12 ">What can I do for you today?</h1> */}

                <div className=" w-[90%] overflow-x-auto flex flex-col space-y-5 mb-2">
                    <MessageThread />
                    <MessageThread />
                    <MessageThread />
                    <MessageThread />
                    <MessageThread />
                    <MessageThread />
                </div>


                <MessageBox />
            </div>
        </MessageRoomContext.Provider>
    )
}