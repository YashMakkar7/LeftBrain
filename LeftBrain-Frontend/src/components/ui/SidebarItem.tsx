import { ReactElement } from "react";

export const SideBarItems = ({text,icon,onClick}:{
    text:string;
    icon:ReactElement;
    onClick:()=>void
}) =>{
    return <div onClick={onClick} className="flex text-gray-700 py-4 text-xl hover:bg-gray-200 rounded max-w-48 cursor-pointer pl-4 transition-all duration-300 items-center ">
        <div className="pr-2">
           {icon} 
        </div>
        <div>
            {text}             
        </div>
    </div>
}