"use server";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../../dbconfig";
import { Message } from "@/utils/definitions";

export default async function storeMessage(message: string, system_response: string | undefined, sessionID:string) {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (session?.userID) {

        const messageRef = collection(firestore, `Users/${String(session?.userID)}/messageHistory/${sessionID}/messages`);

        let newMessage: Message | undefined = undefined;
        if (system_response) {
            newMessage = {
                userMessage: message,
                systemMessage: system_response
            }
        }
        else {
            newMessage = {
                userMessage: message,
            }
        }
        await addDoc(messageRef, newMessage);
    }
}