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

const customTheme: CustomFlowbiteTheme = {
    dropdown: {
        content: "",
        floating: {
            style: {
                auto: "bg-gray-700"
            },

            item: {
                base: "flex font-sfpro w-full cursor-pointer items-center justify-start p-1 text-white focus:outline-none hover:bg-gray-600 focus:bg-gray-600 focus:text-white",

            }
        }
    },
    modal: {
        content: {
            inner: "relative flex max-h-[90dvh] flex-col rounded-lg shadow bg-gray-700"
        },
        header: {
            base: "flex items-start justify-between rounded-t border-b p-5 border-gray-600",
            title: "font-sfpro font-bold tracking-wider text-xl  text-white",
            close: {
                base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
            },
        },
    },
    button: {
        color: {
            failure: "font-sfpro font-semibold border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700",
        }
    }
}

export default function TopNavigationBar(props: any) {

    const info: SessionInfo = props?.userInfo;
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <Navbar fluid rounded className="bg-transparent ">
            <NavbarBrand>
                <span className="self-center font-sfpro text-2xl font-bold tracking-wider flex flex-row">ROBCHAT AI</span>
            </NavbarBrand>

            <div className="font-poppins text-sm flex flex-row items-center">
                <Link href={"login"} className="font-poppins font-semibold tracking-wide mr-4 hover:underline">Sign In</Link>
                <Button as={Link} href={"register"} className="font-poppins font-semibold text-sm bg-[#087830] tracking-wide hover:bg-green-500 active:bg-[#087830]">Register</Button>
            </div>

        </Navbar>
    )
}