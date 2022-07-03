import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://opentdb.com/";

interface useAxiosApiInterface {
  url: string;
  method: "head" | "options" | "put" | "post" | "patch" | "delete" | "get";
  body?: any;
  headers?: any;
}

const useAxiosApi = ({
  url,
  method,
  body = null,
  headers = null,
}: useAxiosApiInterface) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res: any) => {
        setResponse(res.data);
      })
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxiosApi;
