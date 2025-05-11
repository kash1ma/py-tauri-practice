import axios, { AxiosResponse } from "axios";
import { useState } from "react";

function useFetch<T>() {
  const [data, setData] = useState<null | T>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

type RequstType = "post" | "get" | "patch" | "delete"| "put"

  const sendRequset = async (
    url: string,
    type: RequstType,
    body?: Record<string, any>
  ) => {
    let response: AxiosResponse<T> | null = null;
    try {
      
      if (type === "get") {
        response = await axios.get(url);
      }
      if (type === "post") {
        response = await axios.post(url, body);
      }
      if (type === "patch") {
        console.log(body)
        response = await axios.patch(url, body);
      }
      if(type === "delete") {
        response = await axios.delete(url, { data: body})
      }
      if(type === "put") {
        response = await axios.put(url, body)
      }
      setData(response?.data ?? null);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    sendRequset
  };
}

export default useFetch;
