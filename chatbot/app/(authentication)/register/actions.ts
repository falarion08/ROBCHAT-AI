"use server";

import { SignUpFormScheme, RegisterState } from "@/lib/definitions";

export async function registerUser(state: RegisterState, formData: FormData): Promise<RegisterState> {
    const validationResult = SignUpFormScheme.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    });

    if (!validationResult.success) {
        return { errors: validationResult.error.flatten().fieldErrors };
    }

    // TODO: Implement user registration logic here
    return { errors: {} };
}