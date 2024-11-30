
import {  HatIcon } from "../icons/HatIcon"
import { useNavigate } from "react-router-dom"
export const SharedSideBar = () => {
    const ButtonStyle = "bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition duration-300 cursor-pointer text-center text-xl tracking-wider";

    const navigate = useNavigate()
    function signup(){
        //@ts-ignore
        navigate("/signup")
    }
    function signin(){
        //@ts-ignore
        navigate("/")
    }
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 border-2 pl-6">
        <div className="flex text-2xl pt-8 items-center cursor-pointer" onClick={()=>{
            navigate("/dashboard")
        }}>
            <div className="pr-2 text-purple-600">
            <HatIcon/>
            </div>
            Left Brain
        </div>
        <div className="mt-12 mr-4 ">
            <div>
                <div className={`${ButtonStyle} mb-2`} onClick={signin}>Signin</div>
                <div className={`${ButtonStyle}`} onClick={signup}>Signup</div>
            </div>
        </div>
    </div>
} 