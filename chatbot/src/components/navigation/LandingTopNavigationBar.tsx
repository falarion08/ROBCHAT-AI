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