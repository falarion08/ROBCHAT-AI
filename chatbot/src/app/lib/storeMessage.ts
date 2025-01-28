import { cookies } from "next/headers";
import { decrypt } from "./session";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "../../../dbconfig";

export default async function storeMessage(message: string,system_response:string, sessionID: string = ''){
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (session?.userID) {

        if (sessionID.length == 0) {
            const sessionRef = collection(firestore, `Users/${String(session?.userID)}/messageHistory/`);
            const newSession = {
                createdAt: Date.now(),
                summary:message
            }
            const sessionDocRef = await addDoc(sessionRef, newSession);

            sessionID = sessionDocRef.id; 
        }

        const messageRef = collection(firestore, `Users/${String(session?.userID)}/messageHistory/${sessionID}/messages`);

        const newMessage = {
            user: message,
            system: system_response
        }

        await addDoc(messageRef, newMessage);

        return sessionID; 


    }
}