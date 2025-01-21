"use server";
import { LoginFormSchema } from "@/utils/definitions";
import { string } from "zod";
import { cookies } from "next/headers";


export async function validateLogin(formData:FormData){
  
    const validationResult = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    }); 


    if(!validationResult.success){
        return false; 
    }
    return true; 

}
