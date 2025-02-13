"use client";
import { useEffect } from "react"

export default function Page(){
    useEffect(()=>{console.log("test show")}, [])
    return (
        <>Hey</>
    )
}