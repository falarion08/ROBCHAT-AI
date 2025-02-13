"use client";
import { MessageRoomContext } from "@/app/Providers/messageRoomContext";
import { Message } from "@/utils/definitions";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MessageThread from "@/components/MessageThread";
import getBotResponse from "@/utils/getBotResponse";
import storeMessage from "@/app/lib/storeMessage";


export default function Page() {


    const router = useRouter()
    const pathname = usePathname();


    const { setMessages, messages,setIsResponseLoading,
        isResponseLoading,sessionExist } = useContext(MessageRoomContext);

    const [isChatBodyLoading,setIsChatBodyLoading ] = useState<boolean>(false);

      useEffect(() => {
        const getData = async (message: string) => {
          const response = await getBotResponse(message)
    
          let newMessages: Message[] = messages.map((m: Message, i: number) => {
            if (i == messages.length - 1)
              return { userMessage: m.userMessage, systemMessage: response };
            else
              return m;
          });
    
          if (sessionExist) {
            await fetch(`/api/${pathname}`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ userMessage: message, systemResponse: response })
            })
          }
    
          setMessages(newMessages);
          setIsResponseLoading(false);
        }
        if (isResponseLoading) {
          setIsChatBodyLoading(false);
          getData(messages[messages.length - 1].userMessage);

          
        }
    
      }, [isResponseLoading]);
    

        
    useEffect(() => {

        async function getChatData() {

            const response = await fetch(`/api/${pathname}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json"
                    },
                }
            )

            if (response.status == 200) {
                let data = await response.json();
                setMessages(data['data']);
                setIsChatBodyLoading(false);
            } else router.replace('/chat');

        }
        if (!isResponseLoading) {

            getChatData();
        }
    }, []);


    if (!isChatBodyLoading)
        return (
            <div className=" w-[90%]  sm:h-screen h-[75%] py-5 overflow-x-auto flex flex-col space-y-5 mb-2">

                {messages.map((m: Message, i: number) => (<MessageThread listID={i}
                    messageExchange={m} key={i} />))}
            </div>
        )
}