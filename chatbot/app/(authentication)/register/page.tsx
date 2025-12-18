"use client";
import { useState } from "react";
import { Eye, EyeOff} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "./actions";
import { useActionState } from "react";
import { RegisterState } from "@/lib/definitions";

export default function Page(){
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const initialState: RegisterState = {
        errors: {}
    }
    const [state, formAction, isPending] = useActionState(registerUser,initialState);

    return (<>
                <Card className="relative z-10 w-full max-w-md mx-4 bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Create Account
                    </CardTitle>
                    <CardDescription className="text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Join ROBCHAT AI and start your AI journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form action={formAction} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                            {state?.errors.firstName && <p>{state.errors.firstName}</p>}
                            <Input
                                id="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                placeholder="John"
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a855f7] focus:ring-[#a855f7]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                            {state?.errors.lastName && <p>{state.errors.lastName}</p>}

                            <Input
                                id="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                placeholder="Doe"
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a855f7] focus:ring-[#a855f7]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
                            {state?.errors.email && <p>{state.errors.email}</p>}

                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a855f7] focus:ring-[#a855f7]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-300">Password</Label>
                            {state?.errors.password && <p>{state.errors.password}</p>}

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a855f7] focus:ring-[#a855f7] pr-12"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white hover:bg-transparent"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a855f7] focus:ring-[#a855f7] pr-12"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white hover:bg-transparent"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>


                        <Button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-[#a855f7] to-[#00d9ff] text-white font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Create Account
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center">
                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <Button
                            variant="link"
                            className="text-[#00d9ff] p-0 h-auto hover:no-underline cursor-pointer"
                        >
                            Sign in
                        </Button>
                    </p>
                </CardFooter>
            </Card>
    </>);
}