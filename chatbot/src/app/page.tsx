"use client";
import Image from "next/image";
import { sf_pro } from "@/utils/fonts";
import TopNavigationBar from "@/components/navigation/LandingTopNavigationBar";
import { Jacques_Francois } from "next/font/google";
import { useEffect, useState } from "react";
import landingImage from "../../public/images/landing_image.svg";
import { Button } from "flowbite-react";
import Link from "next/link";


export default function Home() {

  return (
    <>
      <div className="flex flex-row justify-evenly items-center px-5 h-[80vh] ">

        <div className=" max-w-[720px]">
          <span className={` font-sfpro font-bold text-5xl text-start `}><span className=" text-green-400">ROBCHAT AI</span>: Your personalized Chatbot</span>
          <p className="mt-[2%] text-base font-sfpro tracking-wide text-justify">
            Introducing your friendly and smart AI chatbot, designed to be your go-to companion for both
            conversations and small tasks. Whether you‘re in the mood for a chat or need help with quick,
            everyday tasks, this AI is always ready to assist. With a warm personality and a knack for
            understanding your needs, it provides accurate responses, personalized advice, and seamless support.
            Perfect for anyone who values efficiency with a human touch, your chatbot makes every interaction easy,
            enjoyable, and stress-free.
          </p>
          <div>
            <Button as={Link} href="login" color="regularTheme" className="max-w-48 mt-[5%] rounded-full">Get Started</Button>

          </div>
        </div>
        <span className="">
          <Image src={landingImage} height={640} width={360} alt="Guy looking at image" className="hidden  md:block overflow-hidden min-w-[360px] rounded-tl-[128px] rounded-tr-[128px] rounded border-transparent ml-10" />
        </span>
      </div>


    </>

  );
}
