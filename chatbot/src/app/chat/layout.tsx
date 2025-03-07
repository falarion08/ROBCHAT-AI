"use client";

import SideBar from "@/components/navigation/SideBarNavigation";
import getBotResponse from "@/utils/getBotResponse";
import { chatHistoryItem, Message } from "@/utils/definitions";
import { useEffect, useRef, useState } from "react";
import { MessageRoomContext } from "../Providers/messageRoomContext";
import MessageThread from "@/components/MessageThread";
import MessageBox from "@/components/MessageBox";
import { usePathname } from "next/navigation";
import DashboardTopNavigationBar from "@/components/navigation/DashboardTopNavBar";
import retrieve from "../lib/userInfoRetriever";


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sideBarVisible, setSideBarVisible] = useState<boolean | undefined>(undefined);
  const [isMainBodyLoading, setIsMainBodyingLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionID, setSessionID] = useState<string | undefined>();
  const [message, setMessage] = useState<string>("");
  const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);
  const [isMessageThreadEmpty, setIsMessageThreadEmpty] = useState<boolean>(true);
  const [sessionExist, setSessionExist] = useState<boolean>(true);
  const [chatHistory, setChatHistory] = useState<chatHistoryItem[] | undefined>(undefined);

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setSideBarVisible(false);
    }
  }

  useEffect(() => {

    async function examineSession() {
      let data = await retrieve();
      if (data) {
        setChatHistory(data['chatHistory']);
        setSessionExist(true);
      }
      else
        setSessionExist(false)
    }

    setSideBarVisible(window.innerWidth <= 640 ? false : true);
    setIsMainBodyingLoading(false);
    window.addEventListener("resize", handleResize);
    examineSession();
    
    // Clean up function
    return ()=>{
      window.removeEventListener("resize",handleResize)
    }
  }, []);

  if (!isMainBodyLoading)
    return (
      <>
        <MessageRoomContext.Provider value={{
          messages, setMessages,
          sessionID, setSessionID,
          message, setMessage,
          isResponseLoading, setIsResponseLoading,
          isMessageThreadEmpty, setIsMessageThreadEmpty,
          sessionExist, chatHistory, setChatHistory
        }}>
          <div className="relative">
            {sessionExist && <SideBar chatHistory={chatHistory} setChatHistory={setChatHistory} sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible} />}
            {sideBarVisible && <div onClick={() => setSideBarVisible(false)} className="max-sm:fixed max-sm:inset-0 max-sm:bg-black opac max-sm:opacity-30 max-sm:z-10 border  sm:hidden" />}
            <div className={`${sideBarVisible && sessionExist && " transition-all sm:ml-64"}`}>
              <DashboardTopNavigationBar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible} />
              <div className={`w-full  ${sideBarVisible && " max-sm:pointer-events-none"}`}>
                <div className="h-[90vh] flex items-center flex-col overscroll-none ">
                  {children}
                  <MessageBox />
                </div>
              </div>
            </div>

          </div>
        </MessageRoomContext.Provider>
      </>
    )

}