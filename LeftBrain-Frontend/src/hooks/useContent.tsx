import { useRecoilState } from "recoil";
import { ContentAtom } from "../Atoms/ContentsAtom";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { useQuery } from "@tanstack/react-query";

export interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  description: string;
}

 export interface FetchContentResponse {
  content: ContentItem[];
}

const fetchContent = async () => {
  return axios.get<FetchContentResponse>(`${BACKEND_URL}/api/v1/content`, {
    headers: {
      "Authorization": localStorage.getItem("token"),
    },
  }).then(
    res => {
      return res.data.content.map((item: any) => ({
        _id: item._id,
        title: item.title,
        link: item.link,
        type: item.type,
        description: item.description
      }));
    }
  );
};

export function useContent() {
  const [content,setContent] = useRecoilState(ContentAtom);

  const {data} = useQuery({
    queryKey:["content"],
    queryFn:fetchContent,
    refetchInterval:1000,
  })
  // @ts-ignore
  if(data && data !== content){
    //@ts-ignore
    setContent(data);
  }

  return content;
}


