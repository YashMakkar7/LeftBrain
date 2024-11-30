
import { useParams } from "react-router-dom"
import { useShareData } from "../hooks/useSharedData";
import { SharedCard } from "../components/ui/ShareCard";
import { SharedSideBar } from "../components/ui/ShareSideBar";

interface contentInterface {
    title: string;
    link: string;
    type: "youtube" | "twitter" | "document";
    description: string;
}

export const SharedBrain = () => {
    const { share } = useParams();
    const content = useShareData(share) as contentInterface[] | null; // Allow content to be null
    if (!content) {
        return <div>Loading...</div>; // Handle the loading state
    }
    return <div>
        <SharedSideBar/>
        <div className="p-4 ml-72 min-h-screen bg-grey-100" >
            <div className="flex justify-end gap-4 pb-6">
                <div className="text-4xl font-sans">
                    Shared
                    <span className="text-purple-600">
                        Brain
                    </span>

                </div>
            </div>
            <div className="ml-6">
                <div className=" flex gap-6 flex-wrap">
                    {content.map(({ type, link, title, description }) => <SharedCard
                        link={link}
                        title={title}
                        type={type}
                        description={description}
                    />)}
                </div>
            </div>
        </div>
    </div>    
}