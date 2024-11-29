import { ReactElement } from "react";

interface ButtonProps {
    varient:"primary"|"secondary";
    text:string;
    startIcon?:ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?:boolean;
}
const varientClass = {
    "primary" : "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}
const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center justify-center"
export const Button = ({varient,text,startIcon,onClick,fullWidth,loading}:ButtonProps) =>{
    return <button onClick={onClick} className={`${varientClass[varient]} ${defaultStyles} ${fullWidth?"w-full":""} ${loading?"opacity-45 cursor-not-allowed":""}`} disabled = {loading}>
        {loading ? (
                <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
            >
                {/* Outer Circle */}
                <circle
                    cx="12"
                    cy="12"
                    r="13"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                />
                {/* Path */}
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    d="M4 12a8 8 0 0 1 16 0"
                    strokeLinecap="round"
                />
            </svg>
            
            
            ) : (
                <>
                    <div className="pr-2">{startIcon}</div>
                    {text}
                </>
            )}
    </button>
}