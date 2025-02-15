"use client";
import { FormEvent, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { validateLogin } from "./actions";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const errMessage = "Invalid email or password";
    const [error,setError] = useState<undefined|string>();

    async function loginUserForm(e:FormEvent<HTMLFormElement>){
        setIsLoading(true); 
        e.preventDefault();
        setError(undefined);
    
        const formData = new FormData(e.currentTarget);
        const loginValid:boolean  = await validateLogin(formData); // Validate input to examine if the user is entering a value that is expected 

        // Redirects user to a page to chat if it's valid 

        if(loginValid)
        {
            const response = await fetch(`/api/auth/login?email=${formData.get('email')}&password=${formData.get('password')}`, {method:"POST"});

            if(response.status == 200)
            {
                router.push('/chat');
                router.refresh();
                
            } else setError(errMessage);

        } else setError(errMessage);
        setIsLoading(false); 
        
    }
    return (
        <div className="h-[90vh] flex items-center justify-center">
            <div className="relative">
                <div className="bg-slate-700 rounded-lg min-w-72 w-[27vw]  px-5 pt-10 pb-20">
                    <p className="text-center font-sfpro font-bold text-xl mb-[10%]">Sign into your account</p>
                    {error && <p className="text-center font-sfpro text-sm text-red-500">{error}</p>}

                    <form onSubmit={loginUserForm} id="login-form" className="flex flex-col gap-6" method="POST">

                        <div>
                            <Label htmlFor="email" value="Email Address" className="text-white font-sfpro font-bold  " />
                            <TextInput className="font-sfpro" color="dark" placeholder="Email Address" id="email" name="email" type="text" />
                        </div>
                        <div>
                            <Label htmlFor="password" value="Password" className="text-white font-sfpro font-bold  " />
                            <TextInput className="font-sfpro" color="dark" placeholder="Password" id="password" name="password" type="password" />
                        </div>
                        <Button isProcessing={isLoading} disabled={isLoading} color="regularTheme" className="mt-[5%]" type="submit">Sign In</Button>
                    </form>
                </div>
                    <p className="font-sfpro tracking-wide absolute bottom-10 text-sm text-center w-full">Don’t have an Account? <Link className=" text-blue-500 hover:text-blue-400 active:text-blue-500 underline" href={"/register"}>Create an Account</Link></p>
            </div>

        </div>

    )
}