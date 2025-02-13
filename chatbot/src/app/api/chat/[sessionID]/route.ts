import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { firestore } from "../../../../../dbconfig";
import { collection, doc, DocumentData, getDoc, getDocs } from "@firebase/firestore";
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

            const querySnapshot = await getDocs(collection(firestore, `Users/${String(session?.userID)}/messageHistory/${sessionID}/messages`));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                messages.push(doc.data())

            });

            if (messages.length === 0)
                throw new Error("Document not found");
            return NextResponse.json({data:messages},{ status: 200 });
        }
    } catch (e) {
        return NextResponse.json({ error: "Document not found" }, { status: 404 })
    }

}

export async function POST(request: Request, { params }: ParamsType){
    const { sessionID } = params;

    let {userMessage, systemResponse} = await request.json()

    try{
        storeMessage(userMessage, systemResponse,sessionID);
        return NextResponse.json({status:200});
    } catch {
        return NextResponse.json({error:'Something went wrong'}, {status:200});
    }

}