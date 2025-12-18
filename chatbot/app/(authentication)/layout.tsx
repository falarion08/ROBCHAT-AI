import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (<>
        <div className="min-h-screen flex items-center justify-center bg-[#0A0E27] relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f3a] via-[#0A0E27] to-[#2d1b4e] opacity-80" />
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#00d9ff]/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
            {children}
            {/* Back button */}
            <Link href="/">
                <Button
                    variant="ghost"
                    className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/10 z-20 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                </Button>
            </Link>

        </div>
    </>);
}
