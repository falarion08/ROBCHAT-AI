"use client";

import SideBar from "@/components/navigation/SideBarNavigation";
import getBotResponse from "@/utils/getBotResponse";
import { Message } from "@/utils/definitions";
import { useEffect, useState } from "react";
import { MessageRoomContext } from "../Providers/messageRoomContext";
import MessageThread from "@/components/MessageThread";
import MessageBox from "@/components/MessageBox";
import isSessionValid from "../lib/isSessionValid";
import { usePathname } from "next/navigation";



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

  const pathname = usePathname();
  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setSideBarVisible(false);
    }
  }

  useEffect(() => {

    async function examineSession() {
      let sessionValid = await isSessionValid();
      setSessionExist(sessionValid);

    }

    setSideBarVisible(window.innerWidth <= 640 ? false : true);
    setIsMainBodyingLoading(false);
    window.addEventListener("resize", handleResize);
    examineSession();
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
          sessionExist
        }}>
          <div className="relative">
            {sessionExist && <SideBar sideBarVisible={sideBarVisible} setSideBarVisible={setSideBarVisible} />}
            {sideBarVisible && <div onClick={() => setSideBarVisible(false)} className="max-sm:fixed max-sm:inset-0 max-sm:bg-black opac max-sm:opacity-30 max-sm:z-10 border  sm:hidden" />}
            <div className={`${sideBarVisible && sessionExist && " transition-all sm:ml-56"}`}>
              <div className={`w-full  ${sideBarVisible && " max-sm:pointer-events-none"}`}>


                <div className="h-[90vh] flex items-center flex-col ">
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