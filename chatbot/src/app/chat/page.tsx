import MessageBox from "@/components/MessageBox"
import retrieve from "../lib/userInfoRetriever"

export default function Page(){

    return (
        <div className="h-full flex items-center justify-center flex-col relative">
            
            <h1 className=" font-poppins text-4xl font-bold tracking-wide w-3/4 text-center absolute top-1/4 ">What can I do for you today?</h1>
            
            <MessageBox/>
        </div>
    )
}