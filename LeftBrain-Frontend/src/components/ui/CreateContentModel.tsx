import { useRef } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { useRecoilState } from "recoil"
import { ContentType, contentTypeAtom } from "../../Atoms/ContentTypeAtom"
import { BACKEND_URL } from "../../config"
import axios from "axios"

export const CreateContentModel = ({ open, onClick }: { open: boolean, onClick: () => void }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useRecoilState(contentTypeAtom);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const description = descriptionRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            type,
            title,
            description
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }
        )
        onClick();
    }
    return <div>
        {open && <div>
            <div className="w-full h-full bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center" onClick={onClick}>
            </div>
            <div className="w-full h-full bg-transparent fixed top-0 left-0 flex justify-center" onClick={onClick}>
                <div className=" flex flex-col justify-center" onClick={(e) => e.stopPropagation()}
                >
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end" >
                            <div onClick={onClick} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder="Title" />
                            <Input reference={linkRef} placeholder="Link" />
                            <Input reference={descriptionRef} placeholder="Description" />
                        </div>
                        <div className="text-gray-500 text-xl mb-1">   
                            <h1>Types</h1>
                        </div>
                        <div className="flex justify-center gap-2 pb-4">
                            <Button text="Youtube" varient={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Youtube)
                            }}></Button>
                            <Button text="Twitter" varient={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Twitter)
                            }}></Button>
                            <Button text="Document" varient={type === ContentType.Document ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Document)
                            }}></Button>
                        </div>

                        <div className="flex justify-center">
                            <Button varient="primary" text="Submit" onClick={addContent}></Button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
        }

    </div>
}

