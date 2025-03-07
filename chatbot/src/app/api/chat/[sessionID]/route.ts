import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { firestore } from "../../../../../dbconfig";
import { collection, doc, DocumentData, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc } from "@firebase/firestore";
import { Message } from "@/utils/definitions";
import storeMessage from "@/app/lib/storeMessage";

interface ParamsType {
    params: { sessionID: string }
}

export async function GET(request: Request, { params }: ParamsType) {
    const { sessionID } = params;
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    let messages: DocumentData[] = [];
    try {
        if (session?.userID) {

            const querySnapshot = await getDocs(query(collection(firestore, `Users/${String(session?.userID)}/messageHistory/${sessionID}/messages`),orderBy('createdAt','asc'),limit(5)));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                messages.push(doc.data())

            });

            if (messages.length === 0)
                throw new Error("Document not found");
            return NextResponse.json({data:messages},{ status: 200 });
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

}

export async function POST(request: Request, { params }: ParamsType){
    const { sessionID } = params;

    try{
        let {userMessage, systemResponse} = await request.json();
        const cookie = cookies().get('session')?.value;
        const session = await decrypt(cookie);

        if(session?.userID){
            const messageHistoryRef = doc(firestore,`Users/${String(session.userID)}/messageHistory`,sessionID)
            await updateDoc(messageHistoryRef,{
                modifiedAt: serverTimestamp(),
            });
            let dateCreated = await storeMessage(userMessage, systemResponse,sessionID);
            return NextResponse.json({dateCreated:dateCreated},{status:200});
        }
    


    } catch {
        return NextResponse.json({error:'Something went wrong'}, {status:200});
    }

}