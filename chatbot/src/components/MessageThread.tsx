"use client";
import LoadingMessage from "./LoadingMessage";
import { useContext } from "react";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Message } from "@/utils/definitions";
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export default function MessageThread(props: any) {

    const { isResponseLoading
    } = useContext(MessageRoomContext);
    const exchange: Message = props.messageExchange;

    return (
        <>
            <div className=" w-full flex flex-col" id="chat-body">
                <div className=" block self-end bg-gray-700 p-2 rounded-lg max-w-lg  text-pretty break-words font-sfpro max-md:max-w-sm  max-sm:max-w-[200px]">
                    {exchange.userMessage}
                </div>

                <div className=" block self-start">
                    <p className=" font-poppins font-bold text-xs">ROBCHAT AI</p>
                    <div className="bg-gray-700 p-2 rounded-lg max-w-lg text-pretty break-words font-sfpro max-md:max-w-sm max-sm:max-w-[200px] ">
                        {isResponseLoading && exchange.systemMessage === undefined ? <LoadingMessage/> :
                            <ReactMarkdown className={`prose text-pretty text-white  font-sfpro `}>{exchange.systemMessage}</ReactMarkdown>}
                    </div>

                </div>
            </div>
        </>
    )
}

