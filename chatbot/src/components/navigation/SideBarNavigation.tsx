"use client";

import { retrieveNextChatHistory } from "@/app/lib/chatDataActions";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Spinner, Tooltip } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useRef, useState } from "react";

export default function SideBar(props: any) {
    const { chatHistory, setChatHistory } = useContext(MessageRoomContext);
    const [isFetchingNextChatHistory, setIsFetchingNextChatHistory] = useState<boolean>(false);
    const scrollElementRef = useRef<HTMLUListElement | null>(null);
    const lastItemKey = useRef(15);

    const router = useRouter();

    const handleScroll = () => {
        const uList = scrollElementRef.current

        if (uList) {

            if (Math.floor(uList.scrollHeight - uList.scrollTop) <= uList.clientHeight - 1)
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
    }, [])



    return (
        <>

            <aside className={`absolute top-0 left-0 z-40 w-64 h-screen  transition-transform ${!props.sideBarVisible && " -translate-x-full"}`} aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-700 rounded text-sm">


                    <div className="flex flex-row justify-end">

                        <Tooltip content="New Chat">

                            <button onClick={() => 
                                router.replace("/")
                            } aria-controls="default-sidebar" type="button" className="rounded-sm inline-flex items-center mt-2 ms-3 text-sm  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">

                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                </svg>


                            </button>
                        </Tooltip>

                        <Tooltip content="Close Sidebar">

                            <button onClick={() => props.setSideBarVisible(false)} aria-controls="default-sidebar" type="button" className="rounded-sm inline-flex items-center mt-2 ms-3 text-sm  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                                <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.99994 10 6 11.9999l1.99994 2M11 5v14m-7 0h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z" />
                                </svg>

                            </button>
                        </Tooltip>

                    </div>


                    <h6 className="pt-2 font-sfpro font-bold text-xl">Chat History</h6>

                    <ul ref={scrollElementRef} className="space-y-2 scrollbar  h-[80vh] overflow-y-auto">
                        {chatHistory ? chatHistory.map((c: any, i: number) =>
                            <li key={i}>
                                <Link className="flex my-3 font-semibold items-center p-2 rounded-lg text-white  hover:bg-gray-600 group" replace={true} href={`/chat/${c.id}`}>{c.data.summary.length <= 20 ? c.data.summary : `${c.data.summary.slice(0, 25)} ...`}</Link>
                            </li>
                        ) : <Spinner color="info" aria-label="Info spinner example" />}

                    </ul>
                </div>
            </aside>

        </>
    );
}

