"use client";

import { retrieveNextChatHistory } from "@/app/lib/chatDataActions";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { Suspense, useContext, useEffect, useRef, useState } from "react";

export default function SideBar(props: any) {
    const { chatHistory, setChatHistory } = useContext(MessageRoomContext);
    const [isFetchingNextChatHistory, setIsFetchingNextChatHistory] = useState<boolean>(false);
    const scrollElementRef = useRef<HTMLUListElement | null>(null);
    const lastItemKey = useRef(15);


    const handleScroll = () => {
        const uList = scrollElementRef.current

        if (uList) {

            if (Math.floor(uList.scrollHeight - uList.scrollTop) <= uList.clientHeight)
                fetchNextChatHistoryData();
        }
    }

    const fetchNextChatHistoryData = async () => {
        setIsFetchingNextChatHistory(true);

        setChatHistory([...chatHistory,
        await retrieveNextChatHistory(chatHistory[lastItemKey.current - 1].id)])
        lastItemKey.current += 5;
        setIsFetchingNextChatHistory(false);

    }

    useEffect(() => {
        const uList = scrollElementRef.current;
        if (uList && chatHistory)
            uList.addEventListener('scroll', handleScroll);
    }, [chatHistory])



    return (
        <>

            <aside className={`absolute top-0 left-0 z-40 w-64 h-screen  transition-transform ${!props.sideBarVisible && " -translate-x-full"}`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-700 rounded text-sm">
                    <button onClick={() => props.setSideBarVisible(false)} aria-controls="default-sidebar" type="button" className="border rounded-sm inline-flex items-center p-2 mt-2 ms-3 text-sm  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>

                    <h6 className="py-2 font-sfpro font-semibold">Chat History</h6>

                    <ul ref={scrollElementRef} className="space-y-2 scrollbar  h-[80vh] overflow-y-auto">
                        {chatHistory ? chatHistory.map((c: any, i: number) =>
                            <li key={i}>
                                <Link className="flex my-3 items-center p-2 rounded-lg text-white  hover:bg-gray-600 group" replace={true} href={`/chat/${c.id}`}>{c.data.summary.length <= 20 ? c.data.summary : `${c.data.summary.slice(0, 25)} ...`}</Link>
                            </li>
                        ) : <Spinner color="info" aria-label="Info spinner example" />}

                    </ul>
                </div>
            </aside>

        </>
    );
}

