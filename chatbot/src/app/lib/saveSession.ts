"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";

/*
    This function stores saves the message history on the database. 
*/

export default async function save(chatID:string = '') {

    
        const cookie = cookies().get('session')?.value;
        const session = await decrypt(cookie); 
        
        // if(session?.userID){
        //     chatID = String(await storeMessage(message,botResponse, chatID));
        // }
    
    return chatID;

}