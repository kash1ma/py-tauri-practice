import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetch = (
  url: string,
  type: "post" | "get",
  body?: Record<string, any>
) => {
  const [data, setData] = useState<null | AxiosResponse>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (type === "post") {
      axios
        .post(url, body)
        .then((response: AxiosResponse) => setData(response))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    } else {
      axios
        .get(url)
        .then((response: AxiosResponse) => setData(response))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [url, type, body]);

  return {
    data,
    isLoading,
    error
  };
};

export default useFetch;
