import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [statusCode, setStatusCode] = useState(null)
    async function Signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username, password
            })
            navigate("/")
        } catch (e: any) {
            setStatusCode(e.response.status)
        }
    }
    async function forwardToSignin() {
        navigate("/")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white border min-w-48 px-4 py-6 rounded-2xl">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />

            {statusCode == 400 && <div className="justify-center flex flex-pt-1 mx-8 max-w-72 text-red-600 text-sm font-semibold">Password should have minimum length of 4 atleast one uppercase, one lowercase, one special character, one number</div>}

            {statusCode == 404 && <div className="justify-center flex flex-pt-1 mx-8 max-w-72 text-red-600 text-sm font-semibold">User Already Exists</div>}

            <div className="justify-center flex pt-2 mx-8">
                <Button varient="primary" text="Signup" fullWidth={true} loading={false} onClick={Signup} />
            </div>

            <div className="justify-centre gap-1 flex  mx-10 max-w-72 text-grey-600 text-sm font-sans pt-2  ">
                <div>Already Have an account ?</div> <div><button onClick={forwardToSignin} className="text-purple-600"> Signin</button></div>
            </div>
        </div>
    </div>
} 