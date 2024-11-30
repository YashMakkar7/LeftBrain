import { useEffect, useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signin(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    async function Signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,password
        })
        //@ts-ignore
        const jwt= response.data.token;
        localStorage.setItem("token",jwt)
        navigate("/dashboard")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white border min-w-48 px-4 py-8 rounded-2xl">
            <Input reference={usernameRef} placeholder="Username"/>
            <Input reference={passwordRef} placeholder="Password"/>
            <div className="justify-center flex pt-4 mx-8" onClick={Signin}>
                <Button varient="primary" text="Signin" fullWidth={true} loading={false}/>
            </div>
        </div>
    </div>
} 