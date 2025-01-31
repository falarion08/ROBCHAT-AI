"use client";

import SideBar from "@/components/navigation/SideBarNavigation";
import { useEffect, useState } from "react";



export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sideBarVisible,setSideBarVisible]= useState<boolean|undefined>(undefined); 
  useEffect(()=>{setSideBarVisible(window.innerWidth <= 640 ? false:true)},[])
  return (
    <>
      <div className="relative">
        <SideBar sideBarVisible= {sideBarVisible} setSideBarVisible={setSideBarVisible}/>
        <div className={`${sideBarVisible&&" transition-all sm:ml-56"}`}>
            <div className="w-full">{children}</div>
        </div>

      </div>
    </>
  )

}