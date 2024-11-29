import { atomFamily, useRecoilValue } from "recoil";
import { ContentAtom } from "./ContentsAtom";

const contentData = useRecoilValue(ContentAtom);

// Define the atomFamily
export const CardAtomFamily = atomFamily({
    key: "cardFamilyAtom",
    default: (id: string) => {
        return contentData.find((x:{id:string})=> x.id === id) ;
    }
});
