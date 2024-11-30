import { useEffect } from "react";
import { DocumentIcon } from "../icons/DocumentIcon";
import { OpenIcon } from "../icons/OpenIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter" | "document";
    description: string;
}

export const SharedCard = ({ title, link, type, description}: CardProps) => {
    const descriptionStyle = "mt-2 font-sans text-lg "
    useEffect(() => {
        if (type === "twitter" && (window as any).twttr) {
            (window as any).twttr.widgets.load();
        }
    }, []);

    return <div>
        <div className="bg-white rounded-md  outline-gray-200 border min-w-72 max-w-72 min-h-48 p-4">
            <div className="flex justify-between">
                <div className="flex items-center text-md" >
                    <div className="text-gray-500 pr-2" >
                        {type == "youtube" && <YoutubeIcon />}
                        {type == "twitter" && <TwitterIcon />}
                        {type == "document" && <DocumentIcon/>}
                    </div>
                    <div className="text-lg font-mono ">
                     {title}
                    </div>
                </div>
                <div className="flex items-center" >
                    {(type == "youtube" || type == "twitter") ?
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                            <OpenIcon />
                        </a>
                    </div> : <div className="pr-2 text-gray-500">
                        {/* todo */}
                    </div>}
                </div>
            </div>

            <div className="pt-2">
                {type === "twitter" && <div>
                    <div className="overflow-y-auto max-h-48 hide-scrollbar" >
                        <blockquote className="twitter-tweet ">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                    {description && <div className={descriptionStyle}>
                        {description}
                    </div>}
                </div>

                }
                {
                    type === "youtube" && <div>
                        <div>
                            <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                        {description && <div className={descriptionStyle}>
                            {description}
                        </div>}
                    </div>
                }
                {
                    type === "document" && <div className={descriptionStyle}>
                        {description}
                    </div>
                } 
            </div>
        </div>
    </div>

}