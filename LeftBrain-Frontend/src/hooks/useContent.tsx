import { useRecoilState } from "recoil";
import { ContentAtom } from "../Atoms/ContentsAtom";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import { useQuery } from "@tanstack/react-query";


const fetchContent = async() => {
  return axios.get(`${BACKEND_URL}/api/v1/content`, {
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  }).then(
    //@ts-ignore
    res => res.data.content
    );  
};

export function useContent() {
  const [content,setContent] = useRecoilState(ContentAtom);
  const {data} = useQuery({
    queryKey:["content"],
    queryFn:fetchContent,
    refetchInterval:1000,
  })
  if(data){
    setContent(data)
  }
  return content;
}


