"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>

            <Card className="relative z-10 w-full max-w-md mx-4 bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-gray-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Sign in to continue to ROBCHAT AI
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email</Label>
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-[#a855f7] data-[state=checked]:border-[#a855f7]" suppressHydrationWarning={true} />
                                <Label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">Remember me</Label>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-[#a855f7] to-[#00d9ff] text-white font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                            Sign In
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="justify-center">

                    <p className="text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <Link href="/register">
                            <Button
                                variant="link"
                                className="text-[#00d9ff] p-0 h-auto hover:no-underline cursor-pointer"
                            >
                                Sign up
                            </Button>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}