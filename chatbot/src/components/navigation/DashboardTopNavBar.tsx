"use client";
import Link from "next/link";
import { Dropdown, Flowbite, Navbar, NavbarBrand, NavbarCollapse, NavbarLink } from "flowbite-react";
import { Button } from "flowbite-react";
import retrieve from "@/app/lib/userInfoRetriever";
import { SessionInfo } from "@/utils/definitions";
import { deleteSession } from "@/app/lib/session";
import { logout } from "@/app/actions";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { SettingsModal } from "../modals/SettingsModal";
import { useState } from "react";
import { dashboardTopNavBar } from "@/utils/customTheme";



export default function DashboardTopNavigationBar(props: any) {

    const [openModal, setOpenModal] = useState<boolean>(false);
    

    return (
        <div className="relative">
            <Navbar fluid rounded className="bg-transparent ">
                <NavbarBrand>
                    {!props.sideBarVisible &&
                        <button onClick={() => props.setSideBarVisible(true)} aria-controls="default-sidebar" type="button" className="bg-gray-800 absolute top-12 left-0  z-40  border rounded-sm   inline-flex items-center p-2 mt-2 ms-3 text-sm  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                    }

                    <span className="self-center font-sfpro text-2xl font-bold tracking-wider flex flex-row">ROBCHAT AI</span>
                </NavbarBrand>

                <div className="font-poppins text-sm flex flex-row items-center">
                    <Flowbite theme={{ theme: dashboardTopNavBar }}>
                        <SettingsModal openModal={openModal} setOpenModal={setOpenModal} />

                        <Dropdown arrowIcon={false} className="" inline label={
                            <svg className="w-[36px] h-[36px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd" />
                            </svg>


                        }>
                            <Dropdown.Item ><button className=" bg-gray-700 hover:bg-gray-600 text-base tracking-wider font-extralight  w-[200px] p-2 text-start" onClick={() => setOpenModal(true)}>Settings</button></Dropdown.Item>
                            <Dropdown.Item><button className=" bg-gray-700 hover:bg-gray-600 text-base tracking-wider  font-extralight  text-red-500 w-[200px] p-2 text-start" onClick={async () => { logout() }}>Sign Out</button></Dropdown.Item>
                        </Dropdown>
                    </Flowbite>
                </div>

            </Navbar>
        </div>
    )
}