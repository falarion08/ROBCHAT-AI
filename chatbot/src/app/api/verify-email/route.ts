import { error } from "console";
import { NextResponse } from "next/server";
import { firestore } from "../../../../dbconfig";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { User } from "@/utils/types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const verificationToken = searchParams.get('verifyToken') as string;
        const userID = searchParams.get('id') as string;

        const docRef = doc(firestore, "Users", userID);
        const docSnap = await getDoc(docRef);
        let user: User | undefined = undefined;

        if (docSnap.exists() && verificationToken) {
            user = docSnap.data() as User;


            if (user.verifyTokenExpire && user.verifyToken) {

                if (user.verifyTokenExpire >= Date.now())
                    user.isVerified = true;

                user.verifyToken = null;
                user.verifyTokenExpire = null;

                if (user.isVerified) {
                    setDoc(doc(firestore, "Users", userID), user);

                    if (user.isVerified) {
                        return NextResponse.json(
                            { message: 'Email verified successfully', verified: true },
                            { status: 200 }
                        );
                    }

                }
            }

        }

        return NextResponse.json(
            { message: 'Invalid or expired token' },
            { status: 400 }
        )

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: 'Something Went Wrong: ' + error },
            { status: 500 }
        )
    }

}