import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [statusCode, setStatusCode] = useState(null)

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    async function Signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username, password
            })
            //@ts-ignore
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            navigate("/dashboard")
        } catch (e: any) {
            setStatusCode(e.response.status)
        }
    }
    async function forwardToSignup() {
        navigate("/signup")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white border min-w-48 px-4 py-6 rounded-2xl">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />

            {statusCode == 404 && <div className="justify-center flex flex-pt-1 mx-8 max-w-72 text-red-600 text-sm font-semibold">User not exist</div>}
            {statusCode == 411 && <div className="justify-center flex flex-pt-1 mx-8 max-w-72 text-red-600 text-sm font-semibold">Incorrect Credentials</div>}

            <div className="justify-center flex pt-2 mx-8" onClick={Signin}>
                <Button varient="primary" text="Signin" fullWidth={true} loading={false} />
            </div>
            <div className="justify-centre gap-1 flex  mx-10 max-w-72 text-grey-600 text-sm font-sans pt-2  ">
                <div>Don't Have an account ?</div> <div><button onClick={forwardToSignup} className="text-purple-600"> Signup</button></div>
            </div>
        </div>
    </div>
} 