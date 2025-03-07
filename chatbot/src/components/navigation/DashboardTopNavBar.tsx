"use client";
import Link from "next/link";
import { Dropdown, Flowbite, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, Tooltip } from "flowbite-react";
import { Button } from "flowbite-react";
import retrieve from "@/app/lib/userInfoRetriever";
import { SessionInfo } from "@/utils/definitions";
import { deleteSession } from "@/app/lib/session";
import { logout } from "@/app/actions";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { SettingsModal } from "../modals/SettingsModal";
import { useState } from "react";
import { dashboardTopNavBar } from "@/utils/customTheme";
import { useRouter } from "next/navigation";



export default function DashboardTopNavigationBar(props: any) {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();

    return (
        <div className="relative">
            <Navbar fluid rounded className="bg-transparent ">
                <NavbarBrand>
                    {!props.sideBarVisible &&
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
                            <Tooltip content="Open Sidebar" placement="bottom">
                                <button onClick={() => props.setSideBarVisible(true)} aria-controls="default-sidebar" type="button" className="bg-gray-800 z-40   rounded-sm   inline-flex items-center mr-6 mt-2 ms-3 text-sm  focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
                                    <span className="sr-only">Open sidebar</span>
                                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6 10 1.99994 1.9999-1.99994 2M11 5v14m-7 0h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z" />
                                    </svg>

                                </button>
                            </Tooltip >
                        </div>
                    }

                    <span className="self-center font-sfpro text-2xl font-bold tracking-wider flex flex-row">ROBCHAT AI</span>
                </NavbarBrand>

                <div className="font-poppins text-sm flex flex-row items-center">
                    <Flowbite theme={{ theme: dashboardTopNavBar }}>
                        <SettingsModal openModal={openModal} setOpenModal={setOpenModal} />

                        <Dropdown arrowIcon={false} className="" inline label={
                            <svg className="w-[36px] h-[36px] text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
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