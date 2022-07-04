import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

axios.defaults.baseURL = "https://opentdb.com/";

interface useAxiosApiInterface {
  url: string;
  method: "head" | "options" | "put" | "post" | "patch" | "delete" | "get";
  body?: any;
  headers?: any;
  modifyRes?: any;
}

const useAxiosApi = ({
  url,
  method,
  body = null,
  headers = null,
  modifyRes,
}: useAxiosApiInterface) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const toast = useToast();

  const fetchData = () => {
    setloading(true);
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res: any) => {
        modifyRes ? modifyRes(res?.data, setResponse) : setResponse(res.data);
      })
      .catch((err: any) => {
        toast({
          title: err.message || "Api error occurred!",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        setError(err);
        modifyRes({}, setResponse);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading, setResponse, refetch };
};

export default useAxiosApi;
