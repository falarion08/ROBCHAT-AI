import {z} from "zod"

export const RegistrationFormSchema = z.object({
    firstName: z.string().regex(new RegExp("^[a-zA-z ,.'-]{2,256}$"),{message:"Check if name is correc"}),
    lastName:z.string().regex(new RegExp("^[a-zA-z ,.'-]{2,256}$"),{message:"Check if name is correct"}),
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,64}$"),
`Password must be: 
- Minimum of 8 characters
- Maximum of 64 characters
- Must contain at least 1 lowercase english character
- Must contain at least 1 uppercase english character
- Must contain at least 1 special character`),
    confirmPassword : z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export const LoginFormSchema = z.object({
    email: z.string().email({message:"Invalid login details"}),
    password: z.string().regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,64}$"), {message:"Invalid login details"})

})

export type SessionPayload = {
    userID: string,
    expiresAt: Date
}
export type SessionInfo = {
    email: any;
    firstName: any;
    lastName: any;
} | undefined

export type Message = {
    userMessage:string,
    systemMessage:string|undefined,
}