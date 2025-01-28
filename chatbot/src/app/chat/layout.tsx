"use client";

import SideBar from "@/components/navigation/SideBarNavigation";
import { useState } from "react";



export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sideBarVisible,setSideBarVisible]= useState<boolean>(true); 
  return (
    <>
      <div className="relative">
        <SideBar sideBarVisible= {sideBarVisible} setSideBarVisible={setSideBarVisible}/>
        <div className={`${sideBarVisible&&" transition-all sm:ml-64"}`}>
            <div className="w-full">{children}</div>

        </div>

      </div>
    </>
  )

}