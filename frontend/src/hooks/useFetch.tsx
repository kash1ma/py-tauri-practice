import axios, { AxiosResponse } from "axios";
import { useState } from "react";

function useFetch<T>() {
  const [data, setData] = useState<null | AxiosResponse<T>>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (type === "post") {
  //     axios
  //       .post(url, body)
  //       .then((response: AxiosResponse<T>) => setData(response))
  //       .catch((err) => setError(err))
  //       .finally(() => setIsLoading(false));
  //   } else if(type === "get"){
  //     axios
  //       .get(url)
  //       .then((response: AxiosResponse<T>) => setData(response))
  //       .catch((err) => setError(err))
  //       .finally(() => setIsLoading(false));
  //   } else {
  //     axios
  //       .put(url, body)
  //       .then((response: AxiosResponse<T>) => setData(response))
  //       .catch((error) => setError(error))
  //   }
  // }, [url, type, body]);

  const sendRequset = async (
    url: string,
    type: "post" | "get" | "patch",
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
        response = await axios.patch(url, body);
      }

      setData(response);
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
