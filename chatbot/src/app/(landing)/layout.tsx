import TopNavigationBar from "@/components/navigation/LandingTopNavigationBar"
import {customTheme} from "@/utils/customTheme"
import { Flowbite } from "flowbite-react"
import retrieve from "../lib/userInfoRetriever"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <Flowbite theme={{ theme: customTheme }}>
            <TopNavigationBar/>
            {children}
        </Flowbite>
    )
}  