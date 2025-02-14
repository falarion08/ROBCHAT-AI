
"use client";
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { MessageRoomContext } from '../Providers/messageRoomContext'
import MessageThread from '@/components/MessageThread';
import { Message } from '@/utils/definitions';
import getBotResponse from '@/utils/getBotResponse';



export default function Page() {
  const { messages, sessionExist, setMessages,
    setIsResponseLoading, isResponseLoading, isMessageThreadEmpty
  } = useContext(MessageRoomContext);

  const scrollDivRef = useRef<HTMLDivElement | null>(null);

  const scrollDownToBottom = () => {
    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight;
    }
  }


  useEffect(() => {

    const getData = async (message: string) => {
      const response = await getBotResponse(message)

      let newMessages: Message[] = messages.map((m: Message, i: number) => {
        if (i == messages.length - 1)
          return { userMessage: m.userMessage, systemMessage: response };
        else
          return m;
      })


      setMessages(newMessages);
      setIsResponseLoading(false);
      scrollDownToBottom();
    }
    if (!sessionExist && isResponseLoading) {
      getData(messages[messages.length - 1].userMessage)
    }

  }, [isResponseLoading]);


  if (!sessionExist) {

    return (<>
      {
        isMessageThreadEmpty ?
          <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center my-24 ">What can I do for you today?</h1>
          :
          <div ref={scrollDivRef} className=" w-[90%]  sm:h-screen h-[75%] py-5 overflow-x-auto flex flex-col space-y-5 mb-2 scrollbar scroll-smooth">
            {messages.map((m: Message, i: number) => (<MessageThread listID={i}
              messageExchange={m} key={i} />))}
          </div>
      }
    </>
    )
  }
  else return <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center my-24 ">What can I do for you today?</h1>

}

