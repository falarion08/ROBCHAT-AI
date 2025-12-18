import * as z from "zod";

export const SignUpFormScheme = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match"
})

export type RegisterState = {
    errors: Record<string, string[]>;
};

export interface LoginFormScheme {
    email: string;
    password: string;
    rememberMe: boolean;
}