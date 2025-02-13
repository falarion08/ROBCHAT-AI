"use server";
import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function isSessionValid() {
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    if (session?.userID)
        return true;
    return false;
}