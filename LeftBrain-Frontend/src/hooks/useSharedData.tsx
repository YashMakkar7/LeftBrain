import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
export const useShareData = (share:any) =>{
    const [data,setData] = useState(null);
    useEffect(()=>{
        const fetchData = async() =>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${share}`);
            //@ts-ignore
            setData(response.data.content)
        } 
        fetchData()
    },[])
    return data;
}