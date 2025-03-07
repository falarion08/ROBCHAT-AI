"use server"; 
import { cookies } from "next/headers";
import { firestore } from "../../../dbconfig";
import { decrypt } from "./session";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, Timestamp } from "@firebase/firestore";
import { chatHistoryItem } from "@/utils/definitions";


export default async function retrieve(){
    const cookie = cookies().get('session')?.value; 
    const session = await decrypt(cookie); 


    if(session?.userID){
        
       const docRef =  doc(firestore,"Users", String(session.userID));
       const docSnap = await getDoc(docRef); 


       if (docSnap.exists()){
            const data = docSnap.data();

            let chatHistory:chatHistoryItem[] = [];

            const chatHistoryQuery = query(collection(firestore,`Users/${String(session.userID)}/messageHistory`), orderBy('modifiedAt', "desc"),limit(15))
            const chatHistorySnapshot = await getDocs(chatHistoryQuery); 

            chatHistorySnapshot.forEach((doc)=>{
                let {createdAt, summary} = doc.data();

                chatHistory.push({
                    id:doc.id,
                    data: {createdAt:createdAt.toDate(),summary:summary},
                })
            })
                        
            return {
                chatHistory:chatHistory
            }
       }

       return undefined; 
    }
}