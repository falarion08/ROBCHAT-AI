"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import LoadingMessage from "./LoadingMessage";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Message } from "@/utils/definitions";
import getBotResponse from "@/utils/getBotResponse";

export default function MessageThread(props: any) {

    const { isResponseLoading
    } = useContext(MessageRoomContext);
    const exchange: Message = props.messageExchange;



    return (
        <div className=" w-full flex flex-col">
            <div className=" block self-end bg-gray-700 p-2 rounded-lg max-w-lg  text-pretty break-words font-sfpro max-md:max-w-sm  max-sm:max-w-[200px]">
                {exchange.userMessage}
            </div>

            <div className=" block self-start">
                <p className=" font-poppins font-bold text-xs">ROBCHAT AI</p>
                <div className="bg-gray-700 p-2 rounded-lg max-w-lg text-pretty break-words font-sfpro max-md:max-w-sm max-sm:max-w-[200px] ">
                    {isResponseLoading && exchange.systemMessage===undefined ? <LoadingMessage /> :
                        <><p>{exchange.systemMessage}</p></>}

                </div>

            </div>
        </div>


    )
}