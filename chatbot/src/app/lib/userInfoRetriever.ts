"use server"; 
import { cookies } from "next/headers";
import { firestore } from "../../../dbconfig";
import { decrypt } from "./session";
import { doc, getDoc } from "@firebase/firestore";


export default async function retrieve(){
    const cookie = cookies().get('session')?.value; 
    const session = await decrypt(cookie); 

    if(session?.userID){
        
       const docRef =  doc(firestore,"Users", String(session?.userID));
       const docSnap = await getDoc(docRef); 


       if (docSnap.exists()){
            const data = docSnap.data(); 

            return {
                email: data['email'],
                firstName: data['firstName'],
                lastName: data['lastName'],
            }
       }

       return undefined; 
    }
}