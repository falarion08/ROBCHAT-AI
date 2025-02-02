"use client";

import SideBar from "@/components/navigation/SideBarNavigation";
import getBotResponse from "@/utils/getBotResponse";
import { Message } from "@/utils/definitions";
import { useEffect, useState } from "react";
import { MessageRoomContext } from "../Providers/messageRoomContext";



export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sideBarVisible, setSideBarVisible] = useState<boolean | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionID, setSessionID] = useState<string | undefined>();
  const [message, setMessage] = useState<string>("");
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const [isMessageThreadEmpty, setIsMessageThreadEmpty] = useState<boolean>(true);

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setSideBarVisible(false);
    }
  }

  useEffect(() => {

    setSideBarVisible(window.innerWidth <= 640 ? false : true);
    setIsLoaded(true);
    window.addEventListener("resize", handleResize);

  }, [])



  useEffect(() => {

    const getData = async (message: string) => {
      const response = await getBotResponse(message)

      let newMessages: Message[] = messages.map((m, i) => {
        if (i == messages.length - 1)
          return { userMessage: m.userMessage, systemMessage: response };
        else
          return m;
      })


      setMessages(newMessages);
      setIsResponseLoading(false);
    }
    if (isResponseLoading)
      getData(messages[messages.length - 1].userMessage)

  }, [isResponseLoading]);





  if (isLoaded)
    return (
      <>
        <MessageRoomContext.Provider value={{
          messages, setMessages,
          sessionID,setSessionID,
          message, setMessage,
          isResponseLoading, setIsResponseLoading,
          isMessageThreadEmpty,setIsMessageThreadEmpty
        }}>
          <div className="relative">
            <SideBar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible} />
            <div className={`${sideBarVisible && " transition-all sm:ml-56"}`}>
              <div className="w-full">{children}</div>
            </div>

          </div>
        </MessageRoomContext.Provider>
      </>
    )

}