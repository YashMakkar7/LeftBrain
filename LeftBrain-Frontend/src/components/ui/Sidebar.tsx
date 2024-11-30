import { DocumentIcon } from "../icons/DocumentIcon"
import { HatIcon } from "../icons/HatIcon"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SideBarItems } from "./SidebarItem"
import { useNavigate } from "react-router-dom"
import { Button } from "./Button"
import { LogOutIcon } from "../icons/LogoutIcon"
export const SideBar = () => {
    const navigate = useNavigate()
    function getTweets() {
        //@ts-ignore
        navigate("/twitter")
    }
    function getYoutube() {
        //@ts-ignore
        navigate("/youtube")
    }
    function getDocument() {
        //@ts-ignore
        navigate("/document")
    }
    function logout(){
        localStorage.removeItem("token");
        navigate("/")
    }
    const sideBarStyle = "h-screen bg-white border-r w-72 fixed left-0 top-0 border-2 pl-6 flex flex-col justify-between"

    return <div className={`${sideBarStyle}`} >
            <div>
                <div className="flex text-2xl pt-8 items-center cursor-pointer" onClick={() => {
                    navigate("/dashboard")
                }}>
                    <div className="pr-2 text-purple-600">
                        <HatIcon />
                    </div>
                    Left Brain
                </div>
                <div className="pt-8 pl-4">
                    <SideBarItems icon={<TwitterIcon />} text="Twitter" onClick={getTweets} />
                    <SideBarItems icon={<YoutubeIcon />} text="Youtube" onClick={getYoutube} />
                    <SideBarItems icon={<DocumentIcon />} text="Document" onClick={getDocument} />
                </div>
            </div>
            
            <div className="bg-blue-100 mb-12 mr-8"><Button varient="primary" onClick={logout} text="LogOut" fullWidth={true} startIcon={<LogOutIcon/>}></Button></div>
        </div>
} 