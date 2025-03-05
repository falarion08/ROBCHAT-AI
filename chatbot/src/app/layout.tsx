import type { Metadata } from "next";
import type { Viewport } from "next";
import TopNavigationBar from "@/components/navigation/LandingTopNavigationBar";
import "./globals.css";
import { poppins, sf_pro } from "@/utils/fonts";
import { Flowbite } from "flowbite-react";
import retrieve from "./lib/userInfoRetriever";
import { useState } from "react";


export const metadata: Metadata = {
  title: "ROBCHAT AI",
  description: "PERSONALIZED AI CHATBOT",

};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,

}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sf_pro.variable} ${poppins.variable} h-[92vh] overflow-hidden bg-gray-800 antialiased text-white`}
      suppressHydrationWarning={true}
      >

        {children}

      </body>
    </html>
  );
}
