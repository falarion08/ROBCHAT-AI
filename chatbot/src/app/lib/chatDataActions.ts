"use server";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { doc, getDoc, query, collection, orderBy, limit, getDocs, startAt, startAfter } from "@firebase/firestore";
import { firestore } from "../../../dbconfig";

import { chatHistoryItem } from "@/utils/definitions";

export async function retrieveNextChatHistory(index:string){
        const cookie = cookies().get('session')?.value; 
        const session = await decrypt(cookie); 
    if(session?.userID){
        
       const docRef =  doc(firestore,"Users", String(session.userID));
       const docSnap = await getDoc(docRef); 


       if (docSnap.exists()){

            let chatHistory:chatHistoryItem[] = [];

            const chatHistoryQuery = query(collection(firestore,`Users/${String(session.userID)}/messageHistory`), orderBy('dateModified','desc'),startAfter(index),limit(5))
            const chatHistorySnapshot = await getDocs(chatHistoryQuery); 

            chatHistorySnapshot.forEach((doc)=>{    
                let {createdAt, summary} = doc.data()
                chatHistory.push({
                    id:doc.id,
                    data: {createdAt:createdAt,summary:summary},
                })
                
            })
                        
            return {
                chatHistory:chatHistory
            }
       }

    }
    return undefined; 
    
}