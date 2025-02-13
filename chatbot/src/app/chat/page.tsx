
"use client";
// import ChatLayout from '@/components/ChatPageLayout'
import MessageBox from '@/components/MessageBox'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { createContext, useContext, useEffect, useState } from 'react'
import { MessageRoomContext } from '../Providers/messageRoomContext'
import MessageThread from '@/components/MessageThread';
import { Message } from '@/utils/definitions';
import { useRouter } from 'next/navigation';
import getBotResponse from '@/utils/getBotResponse';



export default function Page() {
  const { messages, sessionExist, setMessages,
    setIsResponseLoading, isResponseLoading, isMessageThreadEmpty
  } = useContext(MessageRoomContext);

  
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
          <div className=" w-[90%]  sm:h-screen h-[75%] py-5 overflow-x-auto flex flex-col space-y-5 mb-2">
            {messages.map((m: Message, i: number) => (<MessageThread listID={i}
              messageExchange={m} key={i} />))}
          </div>
      }
    </>
    )
  }
  else return <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center my-24 ">What can I do for you today?</h1>

}

