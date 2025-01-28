"use server";

import getBotResponse from "@/utils/getBotResponse";
import storeMessage from "./storeMessage";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function send(message: string, chatID:string = '') {
    let botResponse:string = '';
    
    if (message.length > 0) {
        const cookie = cookies().get('session')?.value;
        const session = await decrypt(cookie); 
        
        botResponse = await getBotResponse(message);
        // if(session?.userID){
        //     chatID = String(await storeMessage(message,botResponse, chatID));
        // }
    }
    return {sessionID:chatID, systemResponse:botResponse}

}