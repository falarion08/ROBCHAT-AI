"use server";
import { NextResponse } from "next/server";
import { firestore } from "../../../../../dbconfig";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createSession } from "@/app/lib/session";

export async function POST(request:Request){

    const {searchParams} = new URL(request.url);
    const email:string|null = searchParams.get('email');
    const password:string|null = searchParams.get('password')

    
    //  Check if email and password are the correct credentials for the user
    if(email && password){
        // Query for the email of the user if it exists and return status 200 if the credentials are correct matches the data in the database
        const userRef = collection(firestore, "Users");
        const q = query(userRef,where("email", "==", email))
        const querySnapshot = await getDocs(q);
        const users:DocumentData[] = [];
        querySnapshot.forEach((doc)=> {
            users.push(doc.data()); 
        })
        // Verify if the email exist in the database and check if the password is a match
        if(users.length == 1 && await bcrypt.compare(password,users[0].password)){

            console.log("valid")
            await createSession(users[0].id);
            return NextResponse.json({message:"Success"},{status:200});
        }
    }

    
    // Return 401 if login credentials are invalid
    return NextResponse.json({ error: "Unauthorized" },{status:401})
}