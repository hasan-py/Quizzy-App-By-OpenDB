import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface formDataInterface {
  userName: string;
}

const nameList: Array<string> = [
  "Florence Cummings",
  "Wallace Sullivan",
  "Caleb Mckenzie",
  "Alan Gutierrez",
  "Yvette Snyder",
  "Jessie Wise",
  "Paulette Ramirez",
  "Keith Ryan",
  "Charlotte Pena",
  "Boyd Bennett",
];

const random = Math.floor(Math.random() * nameList.length);

export const useStartQuizController = () => {
  const [formData, setFormData] = useState<formDataInterface>();
  let navigate = useNavigate();
  const { state }: any = useLocation();

  const setFieldValue = (name: string, value: any) => {
    const obj = (_formData: any) => {
      return {
        ..._formData,
        [name]: value,
      };
    };

    setFormData((oldFormData: any) => obj(oldFormData));
  };

  useEffect(() => {
    if (state?.userName) {
      setFieldValue("userName", state?.userName);
    } else {
      setFieldValue("userName", nameList[random]);
    }
  }, []);

  return {
    setFieldValue,
    formData,
    navigate,
  };
};
