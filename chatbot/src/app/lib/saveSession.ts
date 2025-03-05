"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import storeMessage from "./storeMessage";
import { collection, addDoc, Timestamp, serverTimestamp, FieldValue } from "@firebase/firestore";
import { firestore } from "../../../dbconfig";
import { redirect } from "next/navigation";

/*
    This function stores saves the message history on the database. 
*/

export default async function createChatSessionID(message: string, pathname: string) {


    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (session?.userID && pathname === "/chat") {

        
        const sessionRef = collection(firestore, `Users/${String(session?.userID)}/messageHistory/`);
        const dateCreated= serverTimestamp();
        
        const newSession = {
            createdAt: dateCreated,
            modifiedAt: dateCreated,
            summary: message
        }
        const sessionDocRef = await addDoc(sessionRef, newSession);

        redirect(`/chat/${sessionDocRef.id}`,)

    }

}